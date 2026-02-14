import React from 'react';
import ProductFilters from './components/ProductFiltersInline';

const TestPage = () => {
  const [filters, setFilters] = React.useState({
    dateRange: '',
    genre: ''
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', padding: '40px', color: '#1a1a1a' }}>Filter Test</h1>
      <ProductFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TestPage;
