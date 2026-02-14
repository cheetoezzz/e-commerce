import React, { useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

const ProductFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
  onSearchChange,
  searchQuery
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGenreFilter = (genre) => {
    onFilterChange({ ...filters, genre });
  };

  const handleClearAll = () => {
    onClearFilters();
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-600 w-5 h-5" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        <button
          onClick={toggleExpanded}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center"
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
          <FiX className="ml-2 w-4 h-4" />
        </button>
      </div>

      {/* Filter Options */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Search */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Search</h4>
            <input
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Lighting', value: 'lighting' },
                { label: 'Electronics', value: 'electronics' },
                { label: 'Furniture', value: 'furniture' },
                { label: 'Accessories', value: 'accessories' },
                { label: 'Fashion', value: 'fashion' },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => handleGenreFilter(value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${filters.genre === value
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleClearAll}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
