import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingBagIcon,
  SearchIcon,
  MenuIcon,
  XIcon
} from '@heroicons/react/outline';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { totalItems } = useCart();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Lighting', href: '/category/lighting' },
    { name: 'Electronics', href: '/category/electronics' },
    { name: 'Furniture', href: '/category/furniture' },
    { name: 'Accessories', href: '/category/accessories' },
    { name: 'Fashion', href: '/category/fashion' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-minimal-dark">SHOPORA</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${location.pathname === item.href
                  ? 'text-minimal-dark'
                  : 'text-gray-600 hover:text-minimal-dark'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-minimal-dark transition-colors duration-200"
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-minimal-dark transition-colors duration-200">
              <ShoppingBagIcon className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-minimal-dark text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-minimal-dark transition-colors duration-200"
            >
              {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-minimal-border">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-minimal-border rounded-lg focus:outline-none focus:ring-2 focus:ring-minimal-dark focus:border-transparent"
                  autoFocus
                />
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-minimal-border">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors duration-200 ${location.pathname === item.href
                    ? 'text-minimal-dark'
                    : 'text-gray-600 hover:text-minimal-dark'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
