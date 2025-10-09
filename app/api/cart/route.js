import connectDB from "../../../app/authpg/lib/mongodb";
import Cart from "../../../app/authpg/models/Cart";

export async function POST(req) {
  try {
    const { userId, product } = await req.json();
    if (!userId)
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });

    await connectDB();
    const productId = String(product.productId);
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const existingItem = cart.items.find(
      (item) => String(item.productId) === productId
    );

    if (existingItem) {
      if (existingItem.quantity < (product.stock || 1)) {
        existingItem.quantity += 1;
        await cart.save();
        return new Response(
          JSON.stringify({
            success: true,
            message: "Quantity increased in your cart!",
            cart,
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({ error: "Out of stock", cart }),
          { status: 400 }
        );
      }
    }

    cart.items.push({ ...product, productId, quantity: 1 });
    await cart.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product added to your cart!",
        cart,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Cart POST Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { userId, productId, quantity } = await req.json();

    if (!userId)
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });

    await connectDB();

    const cart = await Cart.findOne({ userId });
    if (!cart)
      return new Response(JSON.stringify({ error: "Cart not found" }), { status: 404 });

    const item = cart.items.find((i) => String(i.productId) === String(productId));
    if (!item)
      return new Response(JSON.stringify({ error: "Item not found" }), { status: 404 });

    // Prevent exceeding stock
    if (quantity > item.stock) {
      return new Response(
        JSON.stringify({ error: "Out of stock", available: item.stock }),
        { status: 400 }
      );
    }

    item.quantity = quantity;
    await cart.save();

    return new Response(
      JSON.stringify({ success: true, message: "Quantity updated", cart }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Cart PATCH Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

// Add this to your existing cart API route (app/api/cart/route.js)

export async function DELETE(req) {
  try {
    const { userId, productId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    await connectDB();

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return new Response(JSON.stringify({ error: "Cart not found" }), { status: 404 });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter((item) => String(item.productId) !== String(productId));
    
    await cart.save();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Item removed from cart", 
        cart 
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Cart DELETE Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}