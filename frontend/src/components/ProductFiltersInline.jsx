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

  const handleCategoryFilter = (category) => {
    onFilterChange({ ...filters, category });
  };

  const handleClearAll = () => {
    onClearFilters();
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '24px',
      marginBottom: '24px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <FiFilter style={{
            color: '#6b7280',
            width: '20px',
            height: '20px'
          }} />
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a1a1a',
            margin: 0,
            padding: 0
          }}>Filters</h3>
        </div>
        <button
          onClick={toggleExpanded}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
          <FiX style={{
            marginLeft: '8px',
            width: '16px',
            height: '16px'
          }} />
        </button>
      </div>

      {/* Filter Options */}
      {isExpanded && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>Search</h4>
            <input
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search products..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                outline: 'none',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>Category</h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {[
                { label: 'Lighting', value: 'lighting' },
                { label: 'Electronics', value: 'electronics' },
                { label: 'Furniture', value: 'furniture' },
                { label: 'Accessories', value: 'accessories' },
                { label: 'Fashion', value: 'fashion' },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => handleCategoryFilter(value)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: filters.category === value ? '#1a1a1a' : '#f8f9fa',
                    color: filters.category === value ? '#ffffff' : '#374151',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <div style={{
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb',
            marginTop: '16px'
          }}>
            <button
              onClick={handleClearAll}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '6px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
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
