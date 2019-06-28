var express = require('express');
var router = express.Router();
const authentication = require('../controllers/authentication')

router.get('/', function(req,res){res.send("Welcome")});
router.post('/login', authentication.login);
router.post('/register', authentication.register);
router.get('/logout', authentication.logout)
module.exports = router;
