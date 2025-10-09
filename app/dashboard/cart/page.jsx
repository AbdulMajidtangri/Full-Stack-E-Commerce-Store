import connectDB from "../../../app/authpg/lib/mongodb";
import Cart from "../../../app/authpg/models/Cart";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CartClient from "./CartClient";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  await connectDB();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // If user not logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-300">
        <h2 className="text-3xl font-semibold mb-4">🛒 Please Log In</h2>
        <p className="text-lg">Sign in to view your personalized cart.</p>
      </div>
    );
  }

  const cart = await Cart.findOne({ userId: user.id }).lean();

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-300">
        <h2 className="text-3xl font-semibold mb-4">🛒 Your Cart is Empty</h2>
        <p className="text-lg">Browse products and start shopping!</p>
      </div>
    );
  }

  // Pass cart and userId to client component
  return <CartClient cartData={JSON.parse(JSON.stringify(cart))} userId={user.id} />;
}
