const express = require("express");

const app = express();

app.use(express.json());

const port = 4000;

const { body, validationResult } = require("express-validator");

app.post(
  "/user",
  // username must be an email
  body("email").isEmail(),
  // password must be at least 5 chars long
  body("pincode").isLength({ min: 6, max: 6 }),

  body("firstName").isAlpha().isLength({ min: 4 }),

  body("lastName").isAlpha().isLength({ min: 4 }),

  body("age").isNumeric(),

  body("gender").isIn(["male", "female", "others"]),

  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.json({
      msg: "user created successfully",
    });
  }
);

app.listen(port, () => {
  console.log("server is running on port 4000");
});
