var express = require("express");
var router = express.Router({ mergeParams: true });
var db = require("../models");
var handlers = require("../handlers/messages");

router.post("/", handlers.createMessage);

module.exports = router;
