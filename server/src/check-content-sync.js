const fs = require('fs');
const path = require('path');
const vm = require('vm');

/**
 * Compares the content seeded by seed.js with client/public/data/*.json and
 * prints every field that differs. Exits with code 1 if anything differs.
 *
 * seed.js is read as text rather than required, because requiring it runs
 * seed(), which wipes and reseeds MongoDB.
 */

const SEED_FILE = path.join(__dirname, 'seed.js');
const DATA_DIR = path.join(__dirname, '..', '..', 'client', 'public', 'data');

const SECTIONS = [
  { constName: 'PROFILE',  file: 'profile.json' },
  { constName: 'PROJECTS', file: 'projects.json' },
  { constName: 'SKILLS',   file: 'skills.json' },
  { constName: 'MEDIA',    file: 'media.json' }
];

function loadSeedConstants() {
  const source = fs.readFileSync(SEED_FILE, 'utf8');
  const constants = {};

  for (const { constName } of SECTIONS) {
    const match = source.match(new RegExp(`const ${constName}\\s*=\\s*([\\s\\S]*?);\\s*\\n(?=\\S)`));
    if (!match) throw new Error(`Could not find const ${constName} in seed.js`);
    constants[constName] = vm.runInNewContext(`(${match[1]})`, {});
  }

  return constants;
}

function loadJson(file) {
  const parsed = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  return parsed.data;
}

function diff(seedValue, jsonValue, fieldPath, out) {
  const bothObjects =
    seedValue && jsonValue && typeof seedValue === 'object' && typeof jsonValue === 'object' &&
    Array.isArray(seedValue) === Array.isArray(jsonValue);

  if (!bothObjects) {
    if (seedValue !== jsonValue) out.push({ fieldPath, seedValue, jsonValue });
    return;
  }

  const keys = Array.isArray(seedValue)
    ? [...Array(Math.max(seedValue.length, jsonValue.length)).keys()]
    : [...new Set([...Object.keys(seedValue), ...Object.keys(jsonValue)])];

  for (const key of keys) {
    const childPath = Array.isArray(seedValue) ? `${fieldPath}[${key}]` : `${fieldPath}.${key}`;
    diff(seedValue[key], jsonValue[key], childPath, out);
  }
}

function format(value) {
  return value === undefined ? '(missing)' : JSON.stringify(value);
}

function main() {
  const seed = loadSeedConstants();
  let total = 0;

  for (const { constName, file } of SECTIONS) {
    const differences = [];
    diff(seed[constName], loadJson(file), file.replace('.json', ''), differences);
    total += differences.length;

    console.log(`\n${constName} vs ${file}: ${differences.length ? `${differences.length} difference(s)` : 'in sync'}`);
    for (const { fieldPath, seedValue, jsonValue } of differences) {
      console.log(`  ${fieldPath}`);
      console.log(`    seed.js: ${format(seedValue)}`);
      console.log(`    json:    ${format(jsonValue)}`);
    }
  }

  console.log(`\n${total ? `${total} difference(s) found` : 'All content in sync'}`);
  process.exitCode = total ? 1 : 0;
}

main();
