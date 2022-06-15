// external imports
const express = require("express");

// internal imports
const { getUsers, addUser } = require("../controller/usersController");
const decorateHtmlResponse = require("../middleWares/common/decorateHtmlResponse");
const avatarUpload = require("../middleWares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middleWares/users/userValidators");
const { route } = require("./loginRouter");

const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add user
route.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

module.exports = router;
