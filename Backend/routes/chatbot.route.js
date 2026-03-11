const express = require("express");
const router = express.Router();
const { getChatResponse } = require("../controllers/chatbot.controller");

router.post("/", getChatResponse);

module.exports = router;
