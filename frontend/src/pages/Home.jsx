import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, StarIcon } from '@heroicons/react/solid';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import apiService from '../services/api';
import ProductGrid from '../components/ProductGrid';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch featured products and categories in parallel
        const [productsResponse, categoriesResponse] = await Promise.all([
          apiService.getFeaturedProducts(8),
          apiService.getCategories(true)
        ]);

        setFeaturedProducts(productsResponse.products || []);
        setCategories(categoriesResponse.categories || []);
      } catch (err) {
        setError('Failed to load data');
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-minimal-gray to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-minimal-dark mb-6">
              Minimal Design,
              <br />
              Maximum Impact
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover carefully curated products that blend form and function. 
              Every piece tells a story of simplicity and elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="btn-primary inline-flex items-center justify-center"
              >
                Shop Now
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-minimal-dark mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked items that showcase our commitment to quality and design excellence
            </p>
          </div>

          {loading ? (
            <LoadingSpinner size="lg" className="py-12" />
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              {error}
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="btn-secondary inline-flex items-center"
            >
              View All Products
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-minimal-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-minimal-dark mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections organized by purpose and style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/category/${category.slug}`}
                className="group card overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <img
                    src={category.image || '/placeholder-category.jpg'}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-minimal-dark mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.productCount || 0} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-minimal-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCartIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-minimal-dark mb-2">
                Free Shipping
              </h3>
              <p className="text-gray-600">
                On orders over $50. Fast and reliable delivery to your doorstep.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-minimal-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-minimal-dark mb-2">
                Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                Every product is carefully selected and quality-checked.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-minimal-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRightIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-minimal-dark mb-2">
                Easy Returns
              </h3>
              <p className="text-gray-600">
                30-day return policy. Shop with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
