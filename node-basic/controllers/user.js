const _ = require("lodash");
const User = require("../models/user");
const formidable = require("formidable");
const fs = require("fs");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ err: "User not found !" });
    }
    // add new object profile
    req.profile = user;
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    // req.profile._id === req.auth._id means looged in user's id is same as profile id
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      message: "User is not authorized to perform this action",
    });
  }
};

exports.getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    // res.json({ users: users });
    res.json(users);
  }).select("name email updated created");
};

exports.getSingleUser = (req, res) => {
  //req.profile because we have already done previously if any route comes by userId a user profile
  //is added to the route based on that userId so we r just returning profile object from request

  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  return res.json(req.profile);
};

// exports.updateUser = (req, res) => {
//   //profile obj is added to routes having :userId

//   let user = req.profile;
//   //extend will mutate the source object user based on req.body(update karega)
//   user = _.extend(user, req.body);
//   user.updated = Date.now();
//   user.save((err) => {
//     if (err) {
//       return res.status(400).json({ error: err });
//       // "You are not authorized to perform this action!"
//     }
//     user.hashed_password = undefined;
//     user.salt = undefined;
//     res.json({ user: user });
//   });
// };

exports.updateUser = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Photo cannot be uploaded" });
    }
    //save
    let user = req.profile;
    //will override if new data in fields
    user = _.extend(user, fields);
    //updated field
    user.updated = Date.now();

    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      user.hashed_password = undefined;
      user.salt = undefined;
      res.json({ user: user });
    });
  });
};

exports.deleteUser = (req, res) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ message: "This user has been deleted from db", user: user });
  });
};
