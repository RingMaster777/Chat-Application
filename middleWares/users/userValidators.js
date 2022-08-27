const { check, validationResult } = require("express-validator");
const { path } = require("express/lib/application");
const createError = require("http-errors");
const { unlink } = require("fs");

// add user

const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("name must not contain anything other than alphabets")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("invalid email")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });

        if (user) {
          throw createError("email already in use");
        }
      } catch (error) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile must be a valid bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });

        if (user) {
          throw createError("mobile already in use");
        }
      } catch (error) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "password must be 8 characters & must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol"
    ),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // there is an error so remove the uploaded files
    if (req.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/public/uploads/avatars/{filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidators,
  addUserValidationHandler,
};
