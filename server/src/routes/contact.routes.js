const router = require('express').Router();
const { send } = require('../controllers/contact.controller');

router.post('/', send);

module.exports = router;
