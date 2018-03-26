const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res, next) => {
  console.log(req.body);
  try {
    //find a user
    let user = await db.User.findOne({
      email: req.body.email
    });

    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid username/password"
      });
    }
  } catch (err) {
    return next({ status: 400, message: "Invalid username/password" });
  }

  //check if the password matches what was sent
  //if it matches
  //log the user in (sijgn a jwt and send it back)
};

exports.signup = async (req, res, next) => {
  try {
    //create a user
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
    //create a token (signing a token)
  } catch (err) {
    //if a validation fails
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message
    });
    //see what kind of error
    //if it is a certain error
    //respond with username/email already taken
    //otherwise just send back a generic 400
  }
};
