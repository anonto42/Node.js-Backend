import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title : {
        type : String ,
        require : [true , "You must give a title"],
        unique : [true , "Try with a unique Title"]
    },
    description : {
        type : String ,
        require : [true , "You must give a description"],
        minlength : [50 , "Description must be at least 50 characters long"],
        maxlength : [500 , "Description must not exceed 500 characters"],
    },
    price : { 
        type : Number ,
        require : [true , "You must give a price"],
        min : [0 , "Price must be positive"],
        max : [1000 , "Price must not exceed 1000"]
    },
    imageUrl : [
        {
            type : String ,
            require : [true , "You must upload your prodect image 1"]
        },
        {
            type : String ,
            require : [true , "You must upload your prodect image 2"]
        },
        {
            type : String ,
            require : [true , "You must upload your prodect image 3"]
        }
    ],
    review : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'review'
    },
    quistion : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'quistion'
    }
},{timestamps:true});

export const Product = mongoose.model("Product",postSchema);