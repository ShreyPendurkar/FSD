const express = require("express");
const {
  getMessages,
  postMessage,
} = require("../controllers/chatController");
const auth = require("../middleware/auth");  // Corrected import path and name

const router = express.Router();

// GET all chat messages (protected)
router.get("/", auth, getMessages);

// POST new chat message (protected)
router.post("/", auth, postMessage);

module.exports = router;
