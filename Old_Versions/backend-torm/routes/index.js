var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/auth_controller')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-up', AuthController.signUp);
router.get('/sign-in', AuthController.signIn);


module.exports = router;
