const r = require('express').Router();
const resume = require('../controllers/resume.controller');

r.get('/download', resume.download);

module.exports = r;
