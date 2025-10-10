import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  stock: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: [cartItemSchema],
    default: [],
  },
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
