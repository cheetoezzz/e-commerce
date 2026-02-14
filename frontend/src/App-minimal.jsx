import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Simple components for testing
const Header = () => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold">Minimal</h1>
    </div>
  </header>
);

const Home = () => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <h2 className="text-3xl font-bold mb-8">Welcome to Minimal</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">Product 1</div>
      <div className="bg-white p-6 rounded-lg shadow">Product 2</div>
      <div className="bg-white p-6 rounded-lg shadow">Product 3</div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p>&copy; 2024 Minimal E-Commerce</p>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
