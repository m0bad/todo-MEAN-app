const jwt = require("jsonwebtoken");

const db = require("../models");

exports.signup = async (req, res, next) => {
  try {
    let user = await db.User.create(req.body);
    // generate  a token for the user
    let { email, username, id } = user;
    let token = jwt.sign(
      {
        id,
        username,
        email
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      username,
      email,
      id,
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or emil is already taken";
    }
    return res.status(400).json({ error: err.message });
  }
};

exports.signin = async (req, res, next) => {
  try {
    let user = await db.User.findOne({ email: req.body.email });
    let isMatch = await user.comparePasswords(req.body.password);
    let { username, email, id } = user;
    // if login successes
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
          email
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        username,
        email,
        id,
        token
      });
    } else {
      console.log("here");
      return res.status(400).json({ error: "Invalid email/password" });
    }
  } catch (err) {
    return res.status(400).json({ error: "Invalid email/password" });
  }
};
