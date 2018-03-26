var express = require("express");
var router = express.Router();
const { signup, signin } = require("../handlers/auth");

// router.post("/signin", helpers.signin);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
