import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Inline styles to avoid Tailwind issues
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
  },
  navLink: {
    color: '#6b7280',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
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
    textAlign: 'center',
    marginBottom: '64px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '16px',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#6b7280',
    marginBottom: '32px',
    lineHeight: '1.5',
  },
  button: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'inline-block',
    transition: 'background-color 0.2s',
  },
  buttonHover: {
    backgroundColor: '#374151',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '32px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
  footer: {
    backgroundColor: '#1a1a1a',
    color: 'white',
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
    color: '#d1d5db',
    marginBottom: '32px',
    lineHeight: '1.5',
  },
  footerCopyright: {
    color: '#9ca3af',
    fontSize: '14px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#6b7280',
  },
};

// Simple Header
const Header = () => (
  <header style={styles.header}>
    <div style={styles.headerContent}>
      <Link to="/" style={styles.logo}>Minimal</Link>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>Home</Link>
        <Link to="/shop" style={styles.navLink}>Shop</Link>
      </nav>
    </div>
  </header>
);

// Home Page
const Home = () => {
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
      <div style={styles.pageContainer}>
        <div style={styles.loading}>Loading amazing products...</div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Minimal Design, Maximum Impact</h1>
        <p style={styles.heroSubtitle}>
          Discover carefully curated products that blend form and function.
        </p>
        <Link to="/shop" style={styles.button}>
          Shop Now
        </Link>
      </div>

      <div>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        <div style={styles.productGrid}>
          {products.slice(0, 8).map((product) => (
            <div key={product._id} style={styles.productCard}>
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/280x280'}
                alt={product.name}
                style={styles.productImage}
              />
              <div style={styles.productContent}>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productPrice}>${product.price}</p>
                <button 
                  style={styles.addToCartBtn}
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
  );
};

// Shop Page
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
      <div style={styles.pageContainer}>
        <div style={styles.loading}>Loading shop...</div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.sectionTitle}>Shop All Products</h1>
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div key={product._id} style={styles.productCard}>
            <img
              src={product.images?.[0] || 'https://via.placeholder.com/280x280'}
              alt={product.name}
              style={styles.productImage}
            />
            <div style={styles.productContent}>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.productPrice}>${product.price}</p>
              <button 
                style={styles.addToCartBtn}
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
  );
};

// Footer
const Footer = () => (
  <footer style={styles.footer}>
    <div style={styles.footerContent}>
      <h2 style={styles.footerLogo}>Minimal</h2>
      <p style={styles.footerText}>
        Discover carefully curated products that blend form and function.
        Every piece tells a story of simplicity and elegance.
      </p>
      <p style={styles.footerCopyright}>
        &copy; 2024 Minimal. All rights reserved.
      </p>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <Header />
        <main style={styles.main}>
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
