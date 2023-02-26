const express = require('express');
const router = express.Router();
const db=require('../database');
const userControlller = require('../controllers/userController')
router.get('/login', function(req, res, next) {
  res.render('login-form');
});

router.post('/login', userControlller.login);


module.exports = router;