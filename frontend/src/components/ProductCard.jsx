import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/outline';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, className = '' }) => {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className={`group card overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      <Link to={`/product/${product._id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-minimal-gray">
          <img
            src={product.images?.[0] || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Product Badge */}
          {product.featured && (
            <span className="absolute top-2 left-2 bg-minimal-dark text-white text-xs px-2 py-1 rounded">
              Featured
            </span>
          )}
          
          {/* Quick Actions */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className={`p-2 rounded-full bg-white shadow-md hover:bg-minimal-gray transition-colors duration-200 ${
                isInCart(product._id) ? 'text-green-600' : 'text-minimal-dark'
              }`}
              title={isInCart(product._id) ? 'In Cart' : 'Add to Cart'}
            >
              <ShoppingCartIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 mb-1">
            {product.category?.name || 'Uncategorized'}
          </p>

          {/* Product Name */}
          <h3 className="font-medium text-minimal-dark mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-minimal-dark">
              {formatPrice(product.price)}
            </span>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                isInCart(product._id)
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-minimal-dark text-white hover:bg-gray-800'
              }`}
            >
              {isInCart(product._id) ? 'Added' : 'Add'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
