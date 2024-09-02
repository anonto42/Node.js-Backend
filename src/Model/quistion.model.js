import mongoose from "mongoose";

const quistionSchema = new mongoose.Schema({
    sender:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    },
    receiver:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Product'
    },
    Quistion : {
        type : String ,
        required : [true , "You must specify a quistion to get your answer or message the seller"]
    },
    Answer : {
        type : String
    }
},{timestamps:true}); 

export const quistion = mongoose.model('quistion' , quistionSchema);