// external imports

const express = require("express");
const router = express.Router();

// internal imports
const { getLogin } = require("../controllers/loginController");
const decorateHtmlResponse = require("../middleWares/common/decorateHtmlResponse");

// login
router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
