const express = require('express');
const router = express.Router();
const userControlller = require('../controllers/userController')

/* GET users listing. */
router.get('/logout', userControlller.logout);
module.exports = router;