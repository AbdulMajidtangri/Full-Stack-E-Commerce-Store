import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
      category: String,
      stock: Number,
      rating: Number,
      quantity: { type: Number, default: 1 },
    },
  ],
});
export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
