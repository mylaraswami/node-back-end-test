var express = require('express');
var router = express.Router();
const users = require('../controllers/user')

router.post('/calculation', users.calculation);
module.exports = router;
