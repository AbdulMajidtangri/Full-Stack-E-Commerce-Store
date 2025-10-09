import Link from "next/link";
import FeaturedProducts from "./Components/FeaturedProducts";
import NewlyLaunchedProducts from "./Components/NewlyLaunchedProducts";
import AllProductsSection from "./Components/AllProductsSection";
export const dynamic = "force-dynamic"; // optional: ensures fresh render
import Footer from "./Components/Footer";
export default function Home() {
  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
          Discover Premium Products, Simplified.
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mb-6">
          Elegant shopping experience — powered by minimal design and modern tech.
        </p>

        <div className="flex gap-4">
          <Link
            href="/dashboard/product"
            className="bg-white text-black font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-200"
          >
            Shop Now
          </Link>

          <Link
            href="/dashboard/about"
            className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-semibold py-2 px-6 rounded-lg transition-all duration-200"
          >
            Learn More
          </Link>
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
