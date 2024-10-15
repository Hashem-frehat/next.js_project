"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useCart } from '../context/cartcontext';
import braintree from 'braintree-web-drop-in';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const { cart, totalPrice } = useCart();
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropinContainerRef = useRef(null);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const testCards = {
    visa: '4111111111111111',
    mastercard: '5555555555554444',
    amex: '378282246310005',
    discover: '6011111111111117',
    jcb: '3530111333300000'
  };

  // Fetch Braintree client token
  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        const response = await fetch('/api/braintree/getClientToken');
        if (!response.ok) {
          throw new Error('Failed to fetch client token');
        }
        const data = await response.json();
        setClientToken(data.clientToken);
      } catch (err) {
        console.error('Error fetching client token:', err);
        setError('Failed to initialize payment system. Please try again later.');
      }
    };

    // Only fetch the client token if we're on the client-side
    if (isClient) {
      fetchClientToken();
    }
  }, [isClient]);

  // Initialize Braintree Drop-in only after clientToken is available and the DOM is ready (client-side)
  useEffect(() => {
    if (clientToken && dropinContainerRef.current && !instance) {
      const initializeBraintree = async () => {
        try {
          const dropinInstance = await braintree.create({
            authorization: clientToken,
            container: dropinContainerRef.current,
          });
          setInstance(dropinInstance);
        } catch (err) {
          console.error('Braintree dropin create error:', err);
          setError('Failed to initialize payment form. Please try again later.');
        }
      };

      initializeBraintree();
    }
  }, [clientToken, dropinContainerRef, instance]);

  // This ensures the component is running in the browser, not on the server.
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePayment = async () => {
    if (!instance) {
      setError('Payment system is not ready. Please try again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { nonce } = await instance.requestPaymentMethod();
      const formattedAmount = totalPrice().toFixed(2);
      const response = await fetch('/api/braintree/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodNonce: nonce, amount: formattedAmount , status: 'pending'}),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Payment failed');
        }

        console.log('Payment successful:', data);

        Swal.fire({
          title: 'Payment Successful!',
          text: 'Thank you for your purchase.',
          icon: 'success',
          confirmButtonText: 'Continue Shopping',
        }).then(() => {
          localStorage.removeItem('cart');
          router.push('/products');
        });
      } else {
        // If the response is not JSON, it's likely an error page
        const text = await response.text();
        throw new Error('Unexpected server response');
      }
    } catch (error) {
      console.error('Payment error:', error);
      Swal.fire({
        title: 'Payment Failed',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="bg-[#FFF8E8] min-h-screen py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-8 text-[#674636]">Error</h1>
          <p className="text-xl text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8E8] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#674636]">Checkout</h1>
        {cart.length === 0 ? (
          <div className="text-center text-xl text-[#674636]">Your cart is empty</div>
        ) : (
          <div>
            {/* New section to display cart items as a list */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#674636]">Your Cart Items</h2>
              <ul className="divide-y divide-[#AAB396]">
                {cart.map((item) => (
                  <li key={item._id} className="py-4 flex items-center">
                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#674636]">{item.name}</h3>
                      <p className="text-[#674636]">Price: ${item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-lg text-[#674636] mb-8">
              <strong>Total Price: </strong>${totalPrice()}
            </div>

            {/* Ensure that this div is empty and only rendered client-side */}
            {isClient && <div ref={dropinContainerRef} />} 

            <div className="text-center mt-8">
              <button
                onClick={handlePayment}
                className="bg-[#674636] text-white font-bold py-2 px-4 rounded hover:bg-[#967D6C]"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;