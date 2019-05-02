const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      requried: true,
      type: String,
      maxlength: 500
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    text: {
      requried: false,
      type: String
    },
    likes: {
      requried: false,
      type: Number
    },
    comments: {
      type: Array,
      default: []
    },
    images: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
