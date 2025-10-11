// components/AllProductsSection.js (SERVER COMPONENT)
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import productsData from "../Data/productsData/productsData";
import AllProductsGrid from "./AllProductsGrid";

export default async function AllProductsSection() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const regularProducts = productsData.filter(
    product => product.category !== "launched" && product.category !== "featured"
  ).slice(0, 6);

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
    <section className="py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Our Latest Products
        </h2>
        
        <AllProductsGrid 
          products={regularProducts}
          initialCart={cart}
          user={user}
        />
      </div>
    </section>
  );
}