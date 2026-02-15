import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageSquare
} from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-minimal-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">SHOPORA</h2>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <FiMail className="h-5 w-5 mr-3" />
                <span>support@shopora.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiPhone className="h-5 w-5 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiMapPin className="h-5 w-5 mr-3" />
                <span>123 Design Street, Creative City, CC 12345</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiClock className="h-5 w-5 mr-3" />
                <span>Mon-Fri: 9AM-6PM EST</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiMessageSquare className="h-5 w-5 mr-3" />
                <span>Live Chat Available</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-white transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-300 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-gray-300 hover:text-white transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-gray-300 hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-300 hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/care" className="text-gray-300 hover:text-white transition-colors">
                  Product Care
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for exclusive offers and new product updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:border-2"
              />
              <button className="px-6 py-2 bg-white text-minimal-dark rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a
                href="https://facebook.com/shopora"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/shopora"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com/shopora"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/company/shopora"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com/shopora"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube className="h-6 w-6" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-gray-300 text-sm">
              <p>&copy; 2026 SHOPORA. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
