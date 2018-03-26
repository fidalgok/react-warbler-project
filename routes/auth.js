var express = require("express");
var router = express.Router();
const { signup } = require("../handlers/auth");

// router.post("/signin", helpers.signin);
router.post("/signup", signup);

module.exports = router;
