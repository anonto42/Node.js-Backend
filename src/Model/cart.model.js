import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({},{})

export const CartModel = mongoose.model("Cart",cartSchema);