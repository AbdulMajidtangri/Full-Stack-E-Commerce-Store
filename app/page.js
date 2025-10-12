import Link from "next/link";
import FeaturedProducts from "./Components/FeaturedProducts";
import NewlyLaunchedProducts from "./Components/NewlyLaunchedProducts";
import AllProductsSection from "./Components/AllProductsSection";
export const dynamic = "force-dynamic";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <div className="bg-white text-gray-900 flex flex-col min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-black leading-tight">
            Discover Premium Products
          </h2>
          <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mb-8 leading-relaxed">
            Elegant shopping experience — powered by minimal design and modern technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/dashboard/product"
              className="bg-black text-white font-semibold py-5 px-12 rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 text-lg"
            >
              Shop Now
            </Link>

            <Link
              href="/dashboard/about"
              className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white font-semibold py-4 px-12 rounded-lg transition-all duration-200 transform hover:scale-105 text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <FeaturedProducts />

      {/* ================= NEWLY LAUNCHED PRODUCTS ================= */}
      <NewlyLaunchedProducts />

      {/* ================= ALL PRODUCTS ================= */}
      <AllProductsSection />

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}