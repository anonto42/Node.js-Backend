import mongoose from "mongoose";

const postSchema = new mongoose.Schema({},{})

export const PostModel = mongoose.model("Post",postSchema);