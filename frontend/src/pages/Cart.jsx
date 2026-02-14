import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiMinus,
  FiPlus,
  FiX,
  FiArrowRight,
  FiShoppingBag
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    items,
    totalItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-minimal-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-minimal-dark mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
              Start shopping to fill it up!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop" className="btn-primary inline-flex items-center justify-center">
                Continue Shopping
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-minimal-gray">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-minimal-dark mb-2">
            Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Review your items and proceed to checkout
            </p>
            {items.length > 1 && (
              <button
                onClick={handleClearCart}
                className="text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-6 border-b border-minimal-border last:border-b-0"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || '/placeholder-product.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-minimal-dark mb-1">
                            {item.name}
                          </h3>
                          <p className="text-lg font-semibold text-minimal-dark">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <XIcon className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-minimal-border rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1 hover:bg-minimal-gray disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-minimal-gray"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>

                        <span className="text-sm text-gray-600">
                          Subtotal: {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center text-minimal-dark hover:text-gray-700 transition-colors"
              >
                <ArrowRightIcon className="h-4 w-4 mr-2 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-minimal-dark mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-minimal-border pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold text-minimal-dark">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full btn-primary inline-flex items-center justify-center mb-4"
              >
                Proceed to Checkout
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>

              {/* Security Badge */}
              <div className="text-center text-sm text-gray-600">
                <div className="flex items-center justify-center mb-2">
                  <svg className="h-4 w-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure Checkout
                </div>
                <p>Your payment information is encrypted and secure</p>
              </div>

              {/* Accepted Payment Methods */}
              <div className="mt-6 pt-6 border-t border-minimal-border">
                <p className="text-sm text-gray-600 mb-3">Accepted Payment Methods</p>
                <div className="flex flex-wrap gap-2">
                  <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                    VISA
                  </div>
                  <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                    MC
                  </div>
                  <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                    AMEX
                  </div>
                  <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                    PP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
