// external imports

const express = require("express");
const router = express.Router();

// internal imports
const { getUsers } = require("../controller/usersController");
const decorateHtmlResponse = require("../middleWares/common/decorateHtmlResponse");

// login
router.get("/", decorateHtmlResponse("users"), getUsers);

module.exports = router;
