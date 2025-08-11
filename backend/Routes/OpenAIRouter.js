const express = require("express");
const { generateCode } = require("../Controllers/openaiController");

const router = express.Router();

/**
 * @route   POST /api/openai/generate
 * @desc    Accepts a prompt from the frontend and returns generated HTML/CSS/JS code
 * @access  Public (Authentication can be added if required)
 */
router.post("/generate", generateCode);

module.exports = router;
