// app/api/payment/process/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { userId, cartItems, totalAmount, paymentMethod, billingAddress, email } = await req.json();

    // Demo: Just log the received data
    console.log('🎯 DEMO PAYMENT RECEIVED:');
    console.log('User ID:', userId);
    console.log('Total Amount:', totalAmount);
    console.log('Number of items:', cartItems?.length);
    console.log('Items:', cartItems?.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      subtotal: (item.price * item.quantity).toFixed(2)
    })));
    console.log('Email:', email);
    console.log('Billing Address:', billingAddress);

    // Demo: Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Demo: Always return success for demo purposes
    const orderId = `demo_order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return NextResponse.json({
      success: true,
      orderId,
      totalAmount,
      items: cartItems,
      message: 'Demo payment processed successfully!',
      demo: true
    });

  } catch (error) {
    console.error('Demo payment error:', error);
    return NextResponse.json(
      { 
        error: 'Demo payment failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}