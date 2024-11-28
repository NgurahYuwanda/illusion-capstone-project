const { body, validationResult } = require("express-validator");

const ValidateUser = [
  body("username").isString().withMessage("Username must be a string").bail().notEmpty().withMessage("Username can't be empty"),

  body("email").isEmail().withMessage("Invalid email format").bail().notEmpty().withMessage("Email can't be empty"),

  body("password").isString().withMessage("Password must be a string").bail().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").bail().notEmpty().withMessage("Password can't be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = ValidateUser;
