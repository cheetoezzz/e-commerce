const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Products
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async getFeaturedProducts(limit = 8) {
    return this.request(`/products/featured?limit=${limit}`);
  }

  async searchProducts(query, limit = 10) {
    return this.request(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  }

  async getProductsByCategory(categorySlug, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products/category/${categorySlug}${queryString ? `?${queryString}` : ''}`);
  }

  async getPriceRange() {
    return this.request(`/products/price-range/stats`);
  }

  // Categories
  async getCategories(includeProductCount = false) {
    return this.request(`/categories${includeProductCount ? '?includeProductCount=true' : ''}`);
  }

  async getCategory(slug) {
    return this.request(`/categories/${slug}`);
  }

  async getCategoryProducts(slug, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/categories/${slug}/products${queryString ? `?${queryString}` : ''}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export default apiService;
