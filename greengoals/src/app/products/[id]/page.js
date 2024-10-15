"use client"

import React from 'react';
import { notFound } from 'next/navigation';
import { useCart } from '../../context/cartcontext';  // Make sure this path is correct
import Swal from 'sweetalert2';
export default function ProductPage({ params }) {
  const { addToCart } = useCart();
  const [product, setProduct] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      const { id } = params;

      if (!id || id === 'undefined') {
        return notFound();
      }

      try {
        console.log(`Fetching product with ID: ${id}`);
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            return notFound();
          }
          throw new Error('Failed to fetch product');
        }

        const productData = await res.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error in ProductPage:', error);
        setError('Error loading product. Please try again later.');
      }
    };

    fetchProduct();
  }, [params]);

 

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      
      // Display a SweetAlert notification
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${product.name} has been added to your cart!`,
        confirmButtonText: 'OK',
      });
  
      console.log(`Added ${product.name} to cart`);
    }
  };
  
  

  if (error) {
    return (
      <div className="bg-[#FFF8E8] min-h-screen flex items-center justify-center">
        <div className="text-[#674636] text-xl">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#FFF8E8] min-h-screen flex items-center justify-center">
        <div className="text-[#674636] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8E8] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-[#F7EED3] rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full md:w-1/2 h-auto object-cover rounded-md mb-6 md:mb-0"
            />
            <div className="md:ml-8">
              <h1 className="text-3xl font-bold mb-4 text-[#674636]">{product.name}</h1>
              <p className="text-lg text-[#674636] opacity-80 mb-4">{product.description}</p>
              <p className="text-2xl font-bold mb-2 text-[#674636]">${product.price}</p>
              <p className="text-md text-[#674636] opacity-70 mb-4">Stock: {product.stock}</p>
              <button 
                onClick={handleAddToCart}
                className="bg-[#AAB396] hover:bg-[#674636] text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}