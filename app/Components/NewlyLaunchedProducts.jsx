// components/NewlyLaunchedProducts.js (SERVER COMPONENT)
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getNewlyLaunchedProducts } from "../Data/productsData/productsData";
import NewlyLaunchedGrid from "./NewlyLaunchedProductsGrid";

export default async function NewlyLaunchedProducts() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Load newly launched products on SERVER
  const newlyLaunched = getNewlyLaunchedProducts();

  // Fetch cart on SERVER if user exists
  let cart = null;
  if (user) {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cart?userId=${user.id}`, {
        next: { revalidate: 0 }
      });
      
      if (res.ok) {
        const data = await res.json();
        cart = data.cart;
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
          Newly Launched
        </h2>
        
        <NewlyLaunchedGrid 
          products={newlyLaunched}
          initialCart={cart}
          user={user}
        />
      </div>
    </section>
  );
}