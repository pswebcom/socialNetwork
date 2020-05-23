const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    //we need permission from user model thats why populate else switch
    .populate("postedBy", "_id name")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({ error: err });
      }

      //add post to the request object
      req.post = post;
      next();
    });
};

exports.getPosts = (req, res) => {
  //Show all posts
  const posts = Post.find()
    .then((posts) => {
      res.json({ allposts: posts });
    })
    .catch((err) => console.log(err));
};

exports.createPost = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  //parse the request
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image couldn't be upload" });
    }

    let post = new Post(fields);

    // req.profile.hashed_password = undefined;
    // req.profile.salt = undefined;

    //req.profile comes from the user because postedBy accepts ObjectId refering to User...check model
    post.postedBy = req.profile;
    // console.log(req.profile);
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(404).json({ error: err });
      }
      res.json(result);
    });
  }); //formData.parse() ends
};

exports.postsByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name email")
    .sort("_created")
    .exec((err, posts) => {
      if (err) {
        return res.status(404).json({ error: err });
      }
      res.json({ posts: posts });
    });
};

exports.isPoster = (req, res, next) => {
  let isCorrectUser =
    req.post && req.auth && req.post.postedBy._id == req.auth._id;

  if (!isCorrectUser) {
    return res.status(403).json({
      message: "User is not authorized to delete this post",
    });
  }
  next();
};

exports.updatePost = (req, res, next) => {
  let post = req.post;
  post = _.extend(post, req.body);
  post.updated = Date.now();
  post.save((err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: err, message: "Update Post method didn't go through" });
    }

    res.json({ post: post });
  });
};

exports.deletePost = (req, res, next) => {
  let post = req.post;
  console.log("req", req.post);
  post.remove((err, deletedPost) => {
    if (err) {
      return res
        .status(400)
        .json({ error: err, message: "Delete Post method didn't go through" });
    }
    res.json({ message: "Post Deleted Successfully!!" });
  });
};
