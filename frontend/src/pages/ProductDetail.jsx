import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MinusIcon, 
  PlusIcon, 
  ShoppingCartIcon, 
  HeartIcon,
  ShareIcon,
  TruckIcon,
  RefreshCwIcon,
  ShieldCheckIcon
} from '@heroicons/react/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/solid';
import apiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        const response = await apiService.getProduct(id);
        setProduct(response.product);
        
        // Fetch related products from same category
        if (response.product.category?.slug) {
          const relatedResponse = await apiService.getProductsByCategory(
            response.product.category.slug,
            { limit: 4 }
          );
          setRelatedProducts(
            relatedResponse.products?.filter(p => p._id !== id) || []
          );
        }
      } catch (err) {
        setError('Product not found');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-minimal-dark mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-minimal-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-minimal-dark">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/shop" className="hover:text-minimal-dark">Shop</Link>
            </li>
            <li>/</li>
            <li>
              <Link 
                to={`/category/${product.category?.slug}`} 
                className="hover:text-minimal-dark"
              >
                {product.category?.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-minimal-dark">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4">
              <img
                src={product.images?.[selectedImage] || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-minimal-dark'
                        : 'border-transparent hover:border-minimal-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-lg p-6">
              {/* Category */}
              <p className="text-sm text-gray-600 mb-2">
                {product.category?.name}
              </p>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-minimal-dark mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="text-3xl font-bold text-minimal-dark mb-6">
                {formatPrice(product.price)}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center border border-minimal-border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-minimal-gray disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="p-2 hover:bg-minimal-gray disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || isInCart(product._id)}
                    className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      product.stock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : isInCart(product._id)
                        ? 'bg-green-600 text-white'
                        : 'bg-minimal-dark text-white hover:bg-gray-800'
                    }`}
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    {isInCart(product._id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>

                {/* Wishlist and Share */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="flex items-center justify-center px-4 py-2 border border-minimal-border rounded-lg hover:bg-minimal-gray transition-colors"
                  >
                    {isWishlisted ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-600 mr-2" />
                    ) : (
                      <HeartIcon className="h-5 w-5 mr-2" />
                    )}
                    Wishlist
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 border border-minimal-border rounded-lg hover:bg-minimal-gray transition-colors">
                    <ShareIcon className="h-5 w-5 mr-2" />
                    Share
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t border-minimal-border pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <TruckIcon className="h-5 w-5 text-minimal-dark mr-2" />
                    <span className="text-sm">Free Shipping</span>
                  </div>
                  <div className="flex items-center">
                    <RefreshCwIcon className="h-5 w-5 text-minimal-dark mr-2" />
                    <span className="text-sm">30-Day Returns</span>
                  </div>
                  <div className="flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 text-minimal-dark mr-2" />
                    <span className="text-sm">1 Year Warranty</span>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="border-t border-minimal-border pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="font-medium text-minimal-dark mr-2">
                          {key}:
                        </span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-minimal-dark mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct._id} className="card overflow-hidden">
                  <Link to={`/product/${relatedProduct._id}`}>
                    <div className="aspect-square bg-gray-200">
                      <img
                        src={relatedProduct.images?.[0] || '/placeholder-product.jpg'}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-minimal-dark mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-semibold text-minimal-dark">
                        {formatPrice(relatedProduct.price)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
