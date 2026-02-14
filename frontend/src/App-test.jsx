import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Minimal E-Commerce</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Product 1</h2>
            <p className="text-gray-600">$89.99</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Product 2</h2>
            <p className="text-gray-600">$129.99</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Product 3</h2>
            <p className="text-gray-600">$59.99</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
