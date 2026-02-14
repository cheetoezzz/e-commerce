import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Simple Header
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">Minimal</h1>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Simple Home Page
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from API
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Minimal Design, Maximum Impact
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover carefully curated products that blend form and function.
        </p>
        <Link
          to="/shop"
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Shop Now
        </Link>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-200">
                <img
                  src={product.images?.[0] || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-lg font-semibold text-gray-900">${product.price}</p>
                <button className="mt-2 w-full bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Shop Page
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square bg-gray-200">
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/300'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
              <p className="text-lg font-semibold text-gray-900">${product.price}</p>
              <button className="mt-2 w-full bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple Footer
const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Minimal</h2>
        <p className="text-gray-300 mb-8">
          Discover carefully curated products that blend form and function.
        </p>
        <p className="text-gray-400">
          &copy; 2024 Minimal. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
