const r = require('express').Router();
const c = require('../controllers/portfolio.controller');

r.get('/profile', c.getProfile);
r.get('/projects', c.getProjects);
r.get('/skills', c.getSkills);
r.get('/media', c.getMedia);

module.exports = r;
