// app/search/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import { productsData } from '../../Data/productsData/productsData';
import Link from 'next/link';
import { Search, ArrowLeft, Star } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = productsData.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.brand.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Search Results for "{query}"
            </h1>
            <p className="text-gray-600 mt-1">
              Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Results */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                href={`/dashboard/product/${product.id}`}  // Corrected link
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-200"
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-t-lg">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={`${
                            star <= Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.rating})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-black font-bold text-lg">${product.price}</p>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Search size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any products matching "{query}"
            </p>
            <div className="space-y-2 text-sm text-gray-500 max-w-md mx-auto">
              <p>• Try searching with different keywords</p>
              <p>• Check for spelling errors</p>
              <p>• Use more general terms</p>
              <p>• Browse all products instead</p>
            </div>
            <Link
              href="/dashboard/product"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}