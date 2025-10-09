import ProductList from './ProductList';
import NewlyLaunchedProducts from "../../Components/NewlyLaunchedProducts";
import FeaturedProducts from '../../Components/FeaturedProducts';
import ProductHerosection from '../../Components/ProductHerosection';
export default async function ProductPage() {
 
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <ProductHerosection />
      {/* Newly Launched Products */}
      <NewlyLaunchedProducts />
      {/* Featured Products */}
      <FeaturedProducts />
      <h1 className="text-4xl font-extrabold mb-8 text-center">Our Products</h1>
        <ProductList />
    </div>
  );
}