"use client"

import React from 'react';
import { useCart } from '../context/cartcontext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    console.log('CartPage mounted, current cart:', cart);
  }, []);

  React.useEffect(() => {
    console.log('Cart updated in CartPage:', cart);
  }, [cart]);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#FFF8E8] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#674636]">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center text-xl text-[#674636]">Your cart is empty</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cart.map((product) => (
                <div key={product._id} className="bg-[#F7EED3] rounded-lg p-6 shadow-lg flex flex-col">
                  <img src={product.images[0]} alt={product.name} className="w-full h-48 object-contain rounded-md mb-4" />
                  <h2 className="text-xl font-semibold text-[#674636] mb-2">{product.name}</h2>
                  <p className="text-lg font-bold text-[#674636] mb-2">${product.price}</p>
                  <button
                    className="bg-[#AAB396] hover:bg-[#674636] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={() => removeFromCart(product._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="text-lg font-bold text-[#674636] mt-4">
              Total Price: ${totalPrice()}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-[#AAB396] hover:bg-[#674636] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <Link href="/checkout">
                <button className="bg-[#AAB396] hover:bg-[#674636] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}