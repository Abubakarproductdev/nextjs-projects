import { Phone } from "lucide-react";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    items: [
      {
        id: String,
        title: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    customer: {
      email: String,
      name: String,
      address: String,
      phone: {type:String, required:true},
    },
    paymentMethod: String,
    subtotal: Number,
    tax: Number,
    total: Number,
   
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
