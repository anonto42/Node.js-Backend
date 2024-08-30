import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({},{timestamps:true})


export const OrderModel = mongoose.model("Order",orderSchema);