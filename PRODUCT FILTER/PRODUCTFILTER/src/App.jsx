import React, { useState } from 'react';
import './App.css';

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1000 },
  { id: 2, name: 'Shirt', category: 'Clothing', price: 25 },
  { id: 3, name: 'Headphones', category: 'Electronics', price: 150 },
  { id: 4, name: 'Jacket', category: 'Clothing', price: 50 },
  { id: 5, name: 'Smartphone', category: 'Electronics', price: 700 },
];

function App() {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState(0);

  const filteredProducts = products.filter(product => {
    return (
      (categoryFilter ? product.category === categoryFilter : true) &&
      (priceFilter ? product.price <= priceFilter : true)
    );
  });

  return (
    <div className="App">
      <h1>Product Filter</h1>

      <div className="filters">
        <label>
          Category:
          <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
          </select>
        </label>

        <label>
          Max Price:
          <input
            type="number"
            onChange={(e) => setPriceFilter(Number(e.target.value))}
            value={priceFilter}
            placeholder="Enter max price"
          />
        </label>
      </div>

      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
