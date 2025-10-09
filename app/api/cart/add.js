import connectDB from "../../../app/authpg/lib/mongodb";
import Cart from "../../../app/authpg/models/Cart";

export async function POST(req) {
  try {
    const { userId, product } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    await connectDB();

    // Ensure productId is always stored as a string
    const productId = String(product.productId);

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Compare as strings to avoid "123" !== 123 mismatch
    const existingItem = cart.items.find(
      (item) => String(item.productId) === productId
    );

    if (existingItem) {
      // Increase the quantity
      existingItem.quantity += product.quantity || 1;
    } else {
      // Push the new product with consistent ID type
      cart.items.push({
        ...product,
        productId, // store as string
        quantity: product.quantity || 1,
      });
    }

    await cart.save();

    return new Response(JSON.stringify({ success: true, cart }), { status: 200 });
  } catch (error) {
    console.error("Cart POST Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
