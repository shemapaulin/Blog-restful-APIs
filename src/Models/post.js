import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image:{
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
