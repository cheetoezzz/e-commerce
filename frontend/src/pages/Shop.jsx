import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { 
  AdjustmentsIcon, 
  ChevronDownIcon, 
  XIcon 
} from '@heroicons/react/outline';
import apiService from '../services/api';
import ProductGrid from '../components/ProductGrid';
import LoadingSpinner from '../components/LoadingSpinner';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'createdAt');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');
  const [priceFilter, setPriceFilter] = useState({
    min: searchParams.get('minPrice') || '',
    max: searchParams.get('maxPrice') || ''
  });
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const params = {
          page: currentPage,
          limit: 12,
          sortBy,
          sortOrder
        };

        if (selectedCategory) params.category = selectedCategory;
        if (searchQuery) params.search = searchQuery;
        if (priceFilter.min) params.minPrice = priceFilter.min;
        if (priceFilter.max) params.maxPrice = priceFilter.max;

        // Fetch products and categories in parallel
        const [productsResponse, categoriesResponse, priceRangeResponse] = await Promise.all([
          apiService.getProducts(params),
          apiService.getCategories(true),
          apiService.getPriceRange()
        ]);

        setProducts(productsResponse.products || []);
        setPagination(productsResponse.pagination);
        setCategories(categoriesResponse.categories || []);
        
        if (priceRangeResponse) {
          setPriceRange({
            min: Math.floor(priceRangeResponse.minPrice),
            max: Math.ceil(priceRangeResponse.maxPrice)
          });
        }
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching shop data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, searchQuery, sortBy, sortOrder, priceFilter, currentPage]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory) params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy !== 'createdAt') params.set('sortBy', sortBy);
    if (sortOrder !== 'desc') params.set('sortOrder', sortOrder);
    if (priceFilter.min) params.set('minPrice', priceFilter.min);
    if (priceFilter.max) params.set('maxPrice', priceFilter.max);
    if (currentPage > 1) params.set('page', currentPage);

    const newParams = params.toString();
    const newPath = newParams ? `${location.pathname}?${newParams}` : location.pathname;
    
    if (newPath !== location.pathname + location.search) {
      setSearchParams(params);
    }
  }, [selectedCategory, searchQuery, sortBy, sortOrder, priceFilter, currentPage, location]);

  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1); // Reset to first page when filters change
    
    switch (filterType) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'search':
        setSearchQuery(value);
        break;
      case 'sortBy':
        setSortBy(value);
        break;
      case 'sortOrder':
        setSortOrder(value);
        break;
      case 'price':
        setPriceFilter(value);
        break;
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setSortBy('createdAt');
    setSortOrder('desc');
    setPriceFilter({ min: '', max: '' });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-minimal-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-minimal-dark mb-2">Shop</h1>
          <p className="text-gray-600">
            {products.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-4"
            >
              <span className="font-medium">Filters</span>
              <AdjustmentsIcon className="h-5 w-5" />
            </button>

            {/* Filters */}
            <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block bg-white rounded-lg shadow-sm p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-minimal-dark">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-minimal-dark"
                >
                  Clear all
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-minimal-dark mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search products..."
                  className="input-field"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-minimal-dark mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.slug}>
                      {category.name} ({category.productCount})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-minimal-dark mb-2">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={priceFilter.min}
                    onChange={(e) => handleFilterChange('price', { ...priceFilter, min: e.target.value })}
                    placeholder="Min"
                    min={priceRange.min}
                    max={priceRange.max}
                    className="input-field"
                  />
                  <input
                    type="number"
                    value={priceFilter.max}
                    onChange={(e) => handleFilterChange('price', { ...priceFilter, max: e.target.value })}
                    placeholder="Max"
                    min={priceRange.min}
                    max={priceRange.max}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-minimal-dark mb-2">
                  Sort By
                </label>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sort, order] = e.target.value.split('-');
                    handleFilterChange('sortBy', sort);
                    handleFilterChange('sortOrder', order);
                  }}
                  className="input-field"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <ProductGrid 
              products={products} 
              loading={loading} 
              error={error}
            />

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrev}
                    className="px-3 py-2 rounded-lg border border-minimal-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-minimal-gray transition-colors"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg border transition-colors ${
                        page === pagination.currentPage
                          ? 'bg-minimal-dark text-white border-minimal-dark'
                          : 'border-minimal-border hover:bg-minimal-gray'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNext}
                    className="px-3 py-2 rounded-lg border border-minimal-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-minimal-gray transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
