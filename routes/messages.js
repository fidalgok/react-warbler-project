var express = require("express");
var router = express.Router({ mergeParams: true });
var db = require("../models");
var handlers = require("../handlers/messages");

router.post("/", handlers.createMessage);

router.get("/:message_id", handlers.getMessage);

router.delete("/:message_id", handlers.deleteMessage);

module.exports = router;
