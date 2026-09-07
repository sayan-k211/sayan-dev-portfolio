# Sayan Dev Portfolio

Personal portfolio site. Live at **[sayankhadka.com](https://sayankhadka.com)**.

Angular frontend, with an Express and MongoDB API in this repo that the site
content is authored and served from.

---

## How it is deployed

The deployed site is **static**. `ng build` produces a folder of files that is
uploaded to Cloudflare Workers static assets, so there is no server process
running and no database call on a page view.

The content still lives in MongoDB behind the Express API in `server/`. That API
is the authoring layer. Its responses are written out to
`client/public/data/*.json`, and the Angular app reads those files at runtime
using the exact same shape the API returns:

```json
{ "success": true, "data": { ... } }
```

This means the app is not coupled to how the data arrives. `PortfolioService`
points at either the API or the JSON files by changing one value in
`src/environments/`, and no component changes.

The site serves the same content to everyone and is updated a handful of times a
year, so a live database read on every page view bought nothing and cost a
monthly server bill plus a cold start on the first visit.

---

## Stack

**Frontend** — Angular 20 (standalone components, signals), SCSS, TypeScript  
**Backend** — Node.js, Express, MongoDB with Mongoose  
**Hosting** — Cloudflare Workers static assets, deployed from `main` on push  
**Contact form** — Formspree, so no server is needed to send mail

---

## Structure

```text
sayan-dev-portfolio/
├── client/                       Angular application
│   ├── public/
│   │   ├── data/                 Content the deployed site reads
│   │   └── assets/ projects/ thumbnails/ resume/
│   ├── src/app/
│   │   ├── pages/                projects, youtube, contact
│   │   ├── shared/               navbar, reveal directive
│   │   └── services/portfolio.ts Single data access point
│   ├── src/environments/         dataBase, assetBase, contactEndpoint
│   └── wrangler.jsonc            Cloudflare static assets config
│
└── server/                       Express API, content authoring layer
    └── src/
        ├── controllers/ models/ routes/
        └── seed.js               Seeds MongoDB with the site content
```

---

## Running it locally

**Frontend only**, which is all you need to work on the site:

```bash
cd client
npm install
npm start
```

Runs on `http://localhost:4200` and reads content from `public/data/`.

**With the API**, if you want to change content at the database layer:

```bash
cd server
npm install
# set MONGO_URI in .env
node src/seed.js
npm start
```

Then point `dataBase` in `client/src/environments/environment.ts` at the running
API instead of `/data`.

---

## Build and deploy

```bash
cd client
npm run build             # outputs to dist/client/browser
```

Cloudflare builds and deploys on every push to `main`, using the settings in
`client/wrangler.jsonc`. `not_found_handling` is set to
`single-page-application` so unmatched paths return `index.html`.

---

## Notes

Content lives in two places, `server/src/seed.js` and
`client/public/data/*.json`. They are generated from the same source and must be
changed together.

Secrets are read from environment variables and are not committed. The Formspree
endpoint in `src/environments/` is a public endpoint by design and is not a
secret.
