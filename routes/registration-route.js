const express = require("express");
const router = express.Router();
const db = require("../database");
const userControlller = require("../controllers/userController");

router.get("/register", userControlller.registerGet);
router.post("/register", userControlller.register);

module.exports = router;
