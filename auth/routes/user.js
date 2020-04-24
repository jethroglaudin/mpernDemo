const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/default").secretOrKey;


// @route POST /
// @desc Regisster a new user account
// @access public

router.post("/", async (req, res) => {
    try {
      const { username, email } = req.body;
      let { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
  
      const existingUser = await pool.query(
        "SELECT * FROM auth WHERE username=$1 OR email=$2",
        [username, email]
      );
  
      if (existingUser.rows.length) {
        res.status(401).json({
          errors: {
            msg:
              existingUser.rows[0].email === email
                ? "Email already registered. Please login"
                : "Username taken",
          },
        });
      }
      let newUser = await pool.query(
        "INSERT into auth (username, password, email) VALUES($1, $2, $3) RETURNING *",
        [username, password, email]
      );
  
      newUser = newUser.rows[0];
      res.json(newUser);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ errors: error });
    }
  });
  
  // @route  POST api/users/login
  // @desc  route to authenticate login attempt
  // @access public
  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      let user = await pool.query(
        "SELECT aid, username, password FROM auth WHERE username = $1",
        [username]
      );
  
      if (!user.rows.length)
        return res.status(404).json({ errors: { login: "Invalid login" } });
  
      user = user.rows[0];
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        pool.query("UPDATE auth SET last_login = NOW() WHERE aid=$1", [user.aid]);
        const payload = {
          id: user.aid,
          username: user.username,
        };
        const token = await jwt.sign(payload, secretKey, {});
  
        return res.json({ token });
      }
      return res.status(401).json({ errors: { login: "Invalid login" } });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ errors: error });
    }
  });

  module.exports = router;