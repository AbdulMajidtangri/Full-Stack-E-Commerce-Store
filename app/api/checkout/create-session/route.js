import { NextResponse } from 'next/server';
import connectDB from "../../../authpg/lib/mongodb";
import Cart from "../../../authpg/models/Cart";

// GET - Get user's cart
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId }).lean();

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// POST - Add item to cart
export async function POST(req) {
  try {
    const { userId, product } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();

    const productId = String(product.productId);

    // ✅ Extract image as string if it's an object
    let imageUrl = "";
    if (typeof product.image === "string") {
      imageUrl = product.image;
    } else if (product.image && product.image.src) {
      imageUrl = product.image.src;
    } else {
      imageUrl = "/default-product.png"; // fallback
    }

    const newItem = {
      productId,
      name: product.name || "Unnamed Product",
      image: imageUrl, // ✅ Fixed here
      price: Number(product.price) || 0,
      quantity: 1,
      stock: Number(product.stock) || 1,
      category: product.category || "general"
    };

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => String(item.productId) === productId
    );

    if (existingItem) {
      if (existingItem.quantity < (newItem.stock || 1)) {
        existingItem.quantity += 1;
        await cart.save();
        return NextResponse.json({
          success: true,
          message: "Quantity increased in your cart!",
          cart,
        });
      } else {
        return NextResponse.json(
          { error: "Out of stock", cart },
          { status: 400 }
        );
      }
    }

    cart.items.push(newItem);
    await cart.save();

    return NextResponse.json({
      success: true,
      message: "Product added to your cart!",
      cart,
    });

  } catch (error) {
    console.error("Cart POST Error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// PATCH - Update item quantity
export async function PATCH(req) {
  try {
    const { userId, productId, quantity } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" }, 
        { status: 401 }
      );
    }

    await connectDB();

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json(
        { error: "Cart not found" }, 
        { status: 404 }
      );
    }

    const item = cart.items.find((i) => String(i.productId) === String(productId));
    
    if (!item) {
      return NextResponse.json(
        { error: "Item not found" }, 
        { status: 404 }
      );
    }

    // Prevent exceeding stock
    if (quantity > item.stock) {
      return NextResponse.json(
        { 
          error: "Out of stock", 
          available: item.stock 
        },
        { status: 400 }
      );
    }

    // Update quantity
    item.quantity = quantity;
    await cart.save();

    return NextResponse.json(
      { 
        success: true, 
        message: "Quantity updated", 
        cart 
      },
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Cart PATCH Error:", error);
    return NextResponse.json(
      { error: "Server error" }, 
      { status: 500 }
    );
  }
}

// DELETE - Remove item from cart or clear entire cart
export async function DELETE(req) {
  try {
    const { userId, productId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" }, 
        { status: 401 }
      );
    }

    await connectDB();

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json(
        { error: "Cart not found" }, 
        { status: 404 }
      );
    }

    // If productId is provided, remove specific item
    if (productId) {
      cart.items = cart.items.filter((item) => String(item.productId) !== String(productId));
      await cart.save();

      return NextResponse.json(
        { 
          success: true, 
          message: "Item removed from cart", 
          cart 
        },
        { status: 200 }
      );
    } else {
      // If no productId, clear entire cart
      cart.items = [];
      await cart.save();

      return NextResponse.json(
        { 
          success: true, 
          message: "Cart cleared successfully", 
          cart 
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Cart DELETE Error:", error);
    return NextResponse.json(
      { error: "Server error" }, 
      { status: 500 }
    );
  }
}