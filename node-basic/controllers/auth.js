const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const User = require("../models/user");

exports.signUp = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({ error: "Email is already in use!!" });

  const user = await new User(req.body);
  await user.save();
  res
    .status(200)
    .json({ message: "You have signed up successfully !! Please Sign In" });
};

exports.signIn = (req, res) => {
  //find the user based on email
  const { email, password } = req.body;
  // console.log(email);
  User.findOne({ email }, (err, user) => {
    //if err or no user exists
    if (err || !user) {
      return res
        .status(401)
        .json({ error: "User with this email doesn't exist ! Check email" });
    }
    //if user is found make sure email & password is matched ....create authenticate method and use here
    if (!user.authenticate(password)) {
      return res
        .status(401)
        .json({ error: "Email and password do not match !" });
    }

    //generate a token on user-id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //persist token as 't' in cookie
    res.cookie("t", token, { expire: new Date() + 9999 });

    //return response with user and token to front end client ---or they can take token from cookie or from json reponse
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  });
};

exports.signOut = (req, res) => {
  // clear the cookie
  res.clearCookie("t");
  res.json({ message: "Sign Out success" });
};

//middleware to enforce route security
exports.requireSignIn = expressJwt({
  // If the token is valid ,express jwt appends the verified users id in an auth key to the request object
  secret: process.env.JWT_SECRET,

  //adding property auth in requireSignIn
  userProperty: "auth",
});
