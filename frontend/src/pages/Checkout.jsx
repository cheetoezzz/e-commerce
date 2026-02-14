import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  ArrowRightIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/outline';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Order Notes
    orderNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate payment fields
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order number
      const orderNum = `ORD-${Date.now().toString().slice(-8)}`;
      setOrderNumber(orderNum);
      
      // Clear cart and show success
      clearCart();
      setOrderComplete(true);
    } catch (error) {
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-minimal-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-minimal-dark mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some products to your cart before proceeding to checkout.
            </p>
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-minimal-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-minimal-dark mb-4">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 mb-2">
              Thank you for your purchase. Your order has been successfully processed.
            </p>
            <p className="text-lg font-medium text-minimal-dark mb-8">
              Order Number: {orderNumber}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-primary">
                Back to Home
              </Link>
              <Link to="/shop" className="btn-secondary">
                Continue Shopping
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
          <Link to="/cart" className="inline-flex items-center text-minimal-dark hover:text-gray-700 mb-4">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-minimal-dark">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-minimal-dark mb-6">
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-minimal-dark mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-minimal-dark mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-minimal-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-minimal-dark mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-minimal-dark mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`input-field ${errors.address ? 'border-red-500' : ''}`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-minimal-dark mb-2">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-minimal-dark mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`input-field ${errors.city ? 'border-red-500' : ''}`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-minimal-dark mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`input-field ${errors.state ? 'border-red-500' : ''}`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-minimal-dark mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`input-field ${errors.zipCode ? 'border-red-500' : ''}`}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-minimal-dark mb-6">
                  Payment Information
                </h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-minimal-dark mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className={`input-field ${errors.cardNumber ? 'border-red-500' : ''}`}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-minimal-dark mb-2">
                    Name on Card *
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={`input-field ${errors.cardName ? 'border-red-500' : ''}`}
                  />
                  {errors.cardName && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-minimal-dark mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={`input-field ${errors.expiryDate ? 'border-red-500' : ''}`}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-minimal-dark mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className={`input-field ${errors.cvv ? 'border-red-500' : ''}`}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm text-green-800">
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-minimal-dark mb-4">
                  Order Notes (Optional)
                </h2>
                <textarea
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Special instructions for delivery..."
                  className="input-field"
                />
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full btn-primary inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Complete Order
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-minimal-dark mb-6">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || '/placeholder-product.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-minimal-dark text-sm line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <span className="font-medium text-minimal-dark">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="border-t border-minimal-border pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
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

              <div className="border-t border-minimal-border pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold text-minimal-dark">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-minimal-border space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <TruckIcon className="h-4 w-4 mr-2 text-minimal-dark" />
                  Free shipping on orders over $50
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ShieldCheckIcon className="h-4 w-4 mr-2 text-minimal-dark" />
                  Secure payment processing
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CreditCardIcon className="h-4 w-4 mr-2 text-minimal-dark" />
                  Multiple payment options
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
