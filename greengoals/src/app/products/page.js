"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`http://localhost:3000/api/products`);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10 text-xl text-[#674636]">Loading...</div>;
  if (error) return <div className="text-center py-10 text-xl text-red-600">Error: {error}</div>;

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="bg-[#FFF8E8] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#674636]">Product Listing</h1>
        
        {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
          <div key={category} className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-[#674636] border-b-2 border-[#674636] pb-2">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {categoryProducts.map((product) => (
                <Link href={`/products/${product._id}`} key={product._id} className="w-full max-w-sm">
                  <div className="bg-[#F7EED3] rounded-lg p-6 shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 h-full flex flex-col justify-between">
                    <div>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-contain rounded-md mb-4"
                      />
                      <h3 className="text-xl font-semibold text-[#674636] mb-2">{product.name}</h3>
                      <p className="text-[#674636] opacity-80 mb-3 flex-grow">{product.description}</p>
                    </div>
                    <div className="mt-auto">
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-[#674636]">${product.price}</p>
                        <p className="text-sm text-[#674636] opacity-70">Stock: {product.stock}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}