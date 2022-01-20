var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const Message = require("./MessageModel");
var MessageService = require("./MessageService");
const verifyToken = require("../middleware/verifyToken");

router.get("/", MessageService.getMessages);

router.post("/", verifyToken, MessageService.create);

router.put("/", verifyToken, MessageService.update);

router.post("/getByMessageID", verifyToken, MessageService.getByOwnerID);

router.get("/getByMessageID", verifyToken, MessageService.getByToken);

router.delete("/:id", verifyToken, MessageService.delete);

module.exports = router;
