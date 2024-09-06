import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    phone:{
        type:String,
        required: true,
        unique: [true, 'please enter an outher phone number'],
    },
    refreshToken:{
        type: String,
    },
    isAdmin:{
        type: Boolean,
        default : false,
    },
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    },
    posts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }
},{timestamps:true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){

    return await bcrypt.compare(password , this.password);

};

userSchema.methods.generateAccesToken = function(){

    return jwt.sign(
        {
            _id : this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )

};

userSchema.methods.generateRefreshToken = function(){

    return jwt.sign(
        {
            _id : this._id,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )

};

export const UserModel = mongoose.model("User",userSchema);