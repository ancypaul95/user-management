const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secretKey, expiresIn } = require("../../config");
const auth = require("../../middleware/auth");

// Register
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, address, phone, image } =
      req.body;

    if (
      !(email && password && firstName && lastName && address && phone && image)
    ) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      address,
      phone,
      image,
    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, secretKey, {
        expiresIn,
      });

      user.token = token;

      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.post("/dashboard", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
