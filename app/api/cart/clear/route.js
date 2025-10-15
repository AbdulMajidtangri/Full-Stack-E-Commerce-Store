import { NextResponse } from 'next/server';
import connectDB from '../../../authpg/lib/mongodb';
import Cart from '../../../authpg/models/Cart';

export async function DELETE(request) {
  try {
    await connectDB();
    
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Clear the user's cart
    const result = await Cart.findOneAndUpdate(
      { userId: userId },
      { 
        items: [],
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Cart cleared successfully' 
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { error: 'Failed to clear cart' },
      { status: 500 }
    );
  }
}