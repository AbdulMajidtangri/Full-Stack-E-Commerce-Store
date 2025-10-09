import Link from 'next/link';
import React from 'react';

export const dynamic = 'force-dynamic'; 
const AboutPage = async () => {
  // You can also fetch data here if needed (it will SSR)
  return (
    <main className="min-h-screen bg-black text-white py-20 px-6 flex flex-col items-center">
      <section className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-gray-300 mb-8 leading-relaxed text-lg">
          Welcome to <span className="text-white font-semibold">Majid’s E-Commerce</span> — 
          your one-stop destination for high-quality, reliable, and modern products.  
          We believe in simplicity, innovation, and providing you the best online shopping experience possible.
        </p>
        <p className="text-gray-400 leading-relaxed mb-8">
          Our platform is designed to combine speed, design, and convenience. 
          Built using cutting-edge technologies like Next.js and Tailwind CSS, 
          we ensure a fast, secure, and intuitive shopping experience for all users.
        </p>

        <div className="flex justify-center gap-4 mt-6">
           <Link
            href="/dashboard/product"
            className="bg-white text-black font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-200"
          >
            Explore PRoducts
          </Link>
         <Link
            href="/dashboard/contact"
            className="bg-black text-white border border-white font-semibold py-2 px-6 rounded-lg shadow-md  transition-all duration-200"
          > 
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
