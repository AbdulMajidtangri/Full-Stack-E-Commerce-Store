// app/dashboard/checkout/payment/page.jsx
import { redirect } from 'next/navigation';
import PaymentForm from './PaymentForm';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import connectDB from "../../../authpg/lib/mongodb";
import Cart from "../../../authpg/models/Cart";
import CheckoutSession from "../../../authpg/models/CheckoutSession";

export default async function PaymentPage() {
  await connectDB();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Redirect if not logged in
  if (!user) {
    redirect('/login');
  }

  // Get fresh cart data from database
  const cart = await Cart.findOne({ userId: user.id }).lean();

  // Redirect if cart is empty
  if (!cart || !cart.items || cart.items.length === 0) {
    redirect('/dashboard/cart');
  }

  // Calculate totals
  const subtotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  // Create checkout session
  const checkoutSession = new CheckoutSession({
    userId: user.id,
    items: cart.items,
    subtotal: subtotal,
    totalItems: totalItems,
    status: 'pending',
    expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
  });

  await checkoutSession.save();

  const cartData = {
    items: cart.items,
    subtotal: subtotal,
    totalItems: totalItems,
    userId: user.id,
    sessionId: checkoutSession._id.toString()
  };

  return (
    <PaymentForm 
      cartData={JSON.parse(JSON.stringify(cartData))}
      subtotal={subtotal}
      sessionId={checkoutSession._id.toString()}
    />
  );
}