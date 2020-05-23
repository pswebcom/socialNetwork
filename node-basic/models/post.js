const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is Required",
    minlength: 4,
    maxlength: 150,
  },
  description: {
    type: String,
    required: "Message body is Required",
    minlength: 4,
    maxlength: 2000,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Post", postSchema);
