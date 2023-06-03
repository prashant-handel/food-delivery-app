const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'foodeee_jwt_secret';

router.post(
  "/createuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        address: req.body.address,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 })
  ],
  async (req, res) => {
    let email = req.body.email;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json("Please enter correct email or sign up!");
      } 
      const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
      if (pwdCompare==false) {
        return res.status(400).json("Please enter correct password or sign up!");
      }
        const data = {
          user: {
            id:userData.id
          }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
