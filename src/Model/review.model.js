import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        min: [1, "Your must give rating"],
        max: [5, "Your must give rating in 5 stars"],
        required: true
    },
    comment: {
        type: String,
        required: [true , "You must provide a comment"]
    }
},{timestamps:true});

export const review = mongoose.model("review", reviewSchema )