import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FiShoppingCart, FiMinus, FiPlus, FiTrash2, FiChevronLeft, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import ProductFilters from './components/ProductFiltersInline.jsx';
import shoporaLogo from './assets/shopora.png';

const PRODUCT_PLACEHOLDER_IMG = 'http://localhost:5000/api/images/placeholder';

const LOCAL_IMAGES = import.meta.glob('./assets/*.png', { eager: true, import: 'default' });

const toSnakeCase = (value) => {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
};

const getLocalImageForProduct = (product) => {
  if (!product) return null;

  const rawId = product._id || product.id;
  const byId = rawId ? `./assets/${toSnakeCase(rawId)}.png` : null;
  if (byId && LOCAL_IMAGES[byId]) return LOCAL_IMAGES[byId];

  const byName = product.name ? `./assets/${toSnakeCase(product.name)}.png` : null;
  if (byName && LOCAL_IMAGES[byName]) return LOCAL_IMAGES[byName];

  return null;
};

const getProductImageSrc = (product) => {
  return (
    getLocalImageForProduct(product) ||
    product?.images?.[0] ||
    PRODUCT_PLACEHOLDER_IMG
  );
};

// Inline styles
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },
  navLink: {
    color: '#6b7280',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
  cartLink: {
    color: '#6b7280',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  cartBadge: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    marginLeft: '4px',
  },
  main: {
    flex: 1,
  },
  pageContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 16px',
  },
  hero: {
    position: 'relative',
    height: '600px',
    overflow: 'hidden',
    marginBottom: '64px',
  },
  heroSlider: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  heroSlide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: 'opacity 1s ease-in-out',
  },
  heroSlideActive: {
    opacity: 1,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    textAlign: 'center',
    color: 'white',
    maxWidth: '800px',
    padding: '0 20px',
    zIndex: 2,
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: 'bold',
    marginBottom: '16px',
    lineHeight: '1.2',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  heroSubtitle: {
    fontSize: '20px',
    marginBottom: '32px',
    lineHeight: '1.5',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  },
  heroButton: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    fontSize: '16px',
    border: '2px solid #1a1a1a',
  },
  heroButtonHover: {
    backgroundColor: 'transparent',
    color: '#1a1a1a',
  },
  heroNavButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 3,
    outline: 'none',
  },
  heroNavButtonLeft: {
    left: '20px',
  },
  heroNavButtonRight: {
    right: '20px',
  },
  heroNavButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    transform: 'translateY(-50%) scale(1.1)',
  },
  heroIndicators: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 3,
  },
  heroIndicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  heroIndicatorActive: {
    backgroundColor: 'white',
    transform: 'scale(1.2)',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '32px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 280px))',
    gap: '24px',
    marginBottom: '64px',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s',
  },
  productImage: {
    width: '100%',
    height: '280px',
    objectFit: 'cover',
    backgroundColor: '#e5e7eb',
  },
  productContent: {
    padding: '16px',
  },
  productName: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  addToCartBtn: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  addToCartBtnAdded: {
    width: '100%',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  footer: {
    backgroundColor: '#f8f9fa',
    color: '#1a1a1a',
    padding: '48px 16px',
  },
  footerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    textAlign: 'center',
  },
  footerLogo: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  footerText: {
    color: '#6b7280',
    marginBottom: '32px',
    lineHeight: '1.5',
  },
  footerCopyright: {
    color: '#9ca3af',
    fontSize: '14px',
  },
  inputField: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #9ca3af',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: 'Inter, system-ui, sans-serif',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    transition: 'all 0.2s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#3b82f6',
      backgroundColor: '#fafbff'
    },
    '&:hover': {
      borderColor: '#6b7280'
    }
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#6b7280',
  },
  cartContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 16px',
  },
  cartHeader: {
    marginBottom: '32px',
  },
  cartTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  cartSubtitle: {
    color: '#6b7280',
    fontSize: '16px',
  },
  cartItems: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '24px',
  },
  cartItem: {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  cartItemLast: {
    padding: '16px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  cartItemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
    backgroundColor: '#e5e7eb',
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  cartItemPrice: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '8px',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  quantityBtn: {
    width: '32px',
    height: '32px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityValue: {
    minWidth: '40px',
    textAlign: 'center',
    fontWeight: '500',
  },
  removeBtn: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  cartSummary: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '24px',
  },
  summaryTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    color: '#6b7280',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    borderTop: '1px solid #e5e7eb',
    paddingTop: '16px',
    marginTop: '16px',
    marginBottom: '24px',
  },
  checkoutBtn: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    color: 'white',
    border: 'none',
    padding: '16px',
    borderRadius: '8px',
    fontWeight: '500',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '16px',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '64px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartIcon: {
    fontSize: '48px',
    color: '#6b7280',
    marginBottom: '16px',
    display: 'block',
  },
  emptyCartTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  emptyCartText: {
    color: '#6b7280',
    marginBottom: '24px',
  },
  backToShop: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'inline-block',
  },
};

// Cart Context
const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product._id);
      if (existingItem) {
        console.log('Updating existing item quantity');
        return prevItems.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      console.log('Adding new item to cart');
      return [...prevItems, {
        id: product._id,
        name: product.name,
        price: product.price,
        image: getProductImageSrc(product),
        quantity: 1
      }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Header Component
const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <Link to="/" style={styles.logo}>
          <img
            src={shoporaLogo}
            alt="SHOPORA"
            style={{
              height: '64px',
              width: 'auto',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          />
        </Link>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/shop" style={styles.navLink}>Shop</Link>
          <Link to="/cart" style={styles.cartLink}>
            <FiShoppingCart size={18} />
            Cart
            {totalItems > 0 && (
              <span style={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

// Hero Slider Component
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600',
      title: 'Minimal Design, Maximum Impact',
      subtitle: 'Discover carefully curated products that blend form and function.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600',
      title: 'Premium Quality, Everyday Elegance',
      subtitle: 'Transform your space with our collection of minimalist essentials.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600',
      title: 'Simplicity Meets Sophistication',
      subtitle: 'Experience the perfect balance of minimalism and functionality.'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600',
      title: 'Curated for Modern Living',
      subtitle: 'Every piece tells a story of simplicity and elegance.'
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      style={styles.hero}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.heroSlider}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              ...styles.heroSlide,
              ...(index === currentSlide ? styles.heroSlideActive : {})
            }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              style={styles.heroImage}
            />
            <div style={styles.heroOverlay}>
              <div style={styles.heroContent}>
                <h1 style={styles.heroTitle}>{slide.title}</h1>
                <p style={styles.heroSubtitle}>{slide.subtitle}</p>
                <Link
                  to="/shop"
                  style={styles.heroButton}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#111827';
                    e.currentTarget.style.borderColor = '#111827';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.backgroundColor = '#0b1220';
                    e.currentTarget.style.borderColor = '#0b1220';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.backgroundColor = '#111827';
                    e.currentTarget.style.borderColor = '#111827';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                    e.currentTarget.style.borderColor = '#1a1a1a';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        style={{ ...styles.heroNavButton, ...styles.heroNavButtonLeft }}
        onClick={goToPrevious}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        style={{ ...styles.heroNavButton, ...styles.heroNavButtonRight }}
        onClick={goToNext}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <FiChevronRight size={20} />
      </button>

      {/* Indicators */}
      <div style={styles.heroIndicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            style={{
              ...styles.heroIndicator,
              ...(index === currentSlide ? styles.heroIndicatorActive : {})
            }}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Home Page
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const { addToCart } = useCart();

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

  const openModal = (imageSrc, alt) => {
    setModalImage({ src: imageSrc, alt });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.loading}>Loading amazing products...</div>
      </div>
    );
  }

  return (
    <div>
      <HeroSlider />
      <div style={styles.pageContainer}>
        <div>
          <h2 style={styles.sectionTitle}>Featured Products</h2>
          <div style={styles.productGrid}>
            {products.slice(0, 8).map((product) => (
              <div key={product._id} style={styles.productCard}>
                <img
                  src={getProductImageSrc(product)}
                  alt={product.name}
                  style={{ ...styles.productImage, cursor: 'pointer' }}
                  loading="lazy"
                  onClick={() => openModal(getProductImageSrc(product), product.name)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PRODUCT_PLACEHOLDER_IMG;
                  }}
                />
                <div style={styles.productContent}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productPrice}>${product.price}</p>
                  <button
                    style={styles.addToCartBtn}
                    onClick={() => addToCart(product)}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#374151'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#1a1a1a'}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer'
          }}
          onClick={closeModal}
        >
          <div
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImage.src}
              alt={modalImage.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
              }}
            />
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Shop Page
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const [filters, setFilters] = useState({
    category: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

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

  const filteredProducts = products.filter(product => {
    let matches = true;

    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      matches = false;
    }

    // Category filter
    if (filters.category && product.category?.slug !== filters.category) {
      matches = false;
    }

    return matches;
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ category: '' });
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openModal = (imageSrc, alt) => {
    setModalImage({ src: imageSrc, alt });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.loading}>Loading shop...</div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <ProductFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />

      <div style={styles.sectionTitle}>Shop All Products</div>
      <div style={styles.productGrid}>
        {filteredProducts.map((product) => (
          <div key={product._id} style={styles.productCard}>
            <img
              src={getProductImageSrc(product)}
              alt={product.name}
              style={{ ...styles.productImage, cursor: 'pointer' }}
              loading="lazy"
              onClick={() => openModal(getProductImageSrc(product), product.name)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = PRODUCT_PLACEHOLDER_IMG;
              }}
            />
            <div style={styles.productContent}>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.productPrice}>${product.price}</p>
              <button
                style={styles.addToCartBtn}
                onClick={() => addToCart(product)}
                onMouseOver={(e) => e.target.style.backgroundColor = '#374151'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#1a1a1a'}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer'
          }}
          onClick={closeModal}
        >
          <div
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImage.src}
              alt={modalImage.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
              }}
            />
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Cart Page
const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={styles.cartContainer}>
        <div style={styles.emptyCart}>
          <FiShoppingCart size={64} style={styles.emptyCartIcon} />
          <h2 style={styles.emptyCartTitle}>Your Cart is Empty</h2>
          <p style={styles.emptyCartText}>
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/shop" style={styles.backToShop}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div style={styles.cartContainer}>
      <div style={styles.cartHeader}>
        <h1 style={styles.cartTitle}>Shopping Cart</h1>
        <p style={styles.cartSubtitle}>
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div style={styles.cartItems}>
        {cartItems.map((item, index) => (
          <div
            key={item.id || index}
            style={index === cartItems.length - 1 ? styles.cartItemLast : styles.cartItem}
          >
            <img
              src={getProductImageSrc(item)}
              alt={item.name}
              style={styles.cartItemImage}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = PRODUCT_PLACEHOLDER_IMG;
              }}
            />
            <div style={styles.cartItemDetails}>
              <h3 style={styles.cartItemName}>{item.name}</h3>
              <p style={styles.cartItemPrice}>${item.price}</p>
              <div style={styles.quantityControls}>
                <button
                  style={styles.quantityBtn}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <FiMinus size={14} />
                </button>
                <span style={styles.quantityValue}>{item.quantity}</span>
                <button
                  style={styles.quantityBtn}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <FiPlus size={14} />
                </button>
              </div>
            </div>
            <button
              style={styles.removeBtn}
              onClick={() => removeFromCart(item.id)}
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div style={styles.cartSummary}>
        <h2 style={styles.summaryTitle}>Order Summary</h2>
        <div style={styles.summaryRow}>
          <span>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div style={styles.summaryRow}>
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div style={styles.summaryTotal}>
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <Link to="/checkout" style={styles.checkoutBtn}>
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

// Checkout Page
const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const totalPrice = getTotalPrice();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate order ID
    const newOrderId = 'ORD-' + Date.now();
    setOrderId(newOrderId);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div style={styles.pageContainer}>
        <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiCheckCircle />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '16px' }}>
            Order Placed Successfully!
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '24px' }}>
            Thank you for your order. Your order ID is: <strong>{orderId}</strong>
          </p>
          <Link to="/" style={{ ...styles.checkoutBtn, maxWidth: '200px', width: 'auto', margin: '0 auto' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '32px' }}>
        Checkout
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', alignItems: 'start' }}>
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit}>
            {/* Billing Information */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '16px' }}>
                Billing Information
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  style={styles.inputField}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  style={styles.inputField}
                />
              </div>
              <div style={{ marginTop: '16px' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={styles.inputField}
                />
              </div>
              <div style={{ marginTop: '16px' }}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  style={styles.inputField}
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '16px' }}>
                Shipping Address
              </h2>
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                style={styles.inputField}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginTop: '16px' }}>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  style={styles.inputField}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  style={styles.inputField}
                />
              </div>
              <div style={{ marginTop: '16px' }}>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  style={styles.inputField}
                />
              </div>
            </div>

            {/* Payment Information */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '16px' }}>
                Payment Information
              </h2>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                style={styles.inputField}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  style={styles.inputField}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  style={styles.inputField}
                />
              </div>
            </div>

            <button type="submit" style={styles.checkoutBtn}>
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={styles.cartSummary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={getProductImageSrc(item)}
                  alt={item.name}
                  style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{item.name}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Qty: {item.quantity}</p>
                </div>
              </div>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div style={{ borderTop: '1px solid #e5e7eb', margin: '16px 0' }}></div>

          <div style={styles.summaryRow}>
            <span>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div style={styles.summaryTotal}>
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer
const Footer = () => (
  <footer style={styles.footer}>
    <div style={styles.footerContent}>
      <div style={{ ...styles.footerLogo, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={shoporaLogo}
          alt="SHOPORA"
          style={{
            height: '160px',
            width: 'auto',
            marginBottom: '8px'
          }}
        />
      </div>
      <p style={styles.footerCopyright}>
        &copy; 2026 SHOPORA. All rights reserved.
      </p>
    </div>
  </footer>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={styles.container}>
          <Header />
          <main style={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
