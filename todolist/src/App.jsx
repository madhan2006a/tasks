import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Filter from "./components/Filter";
import "./App.css";

const App = () => {
  const [products] = useState([
    { id: 1, name: "Laptop", category: "Electronics", price: 500 },
    { id: 2, name: "Headphones", category: "Electronics", price: 50 },
    { id: 3, name: "T-shirt", category: "Clothing", price: 20 },
    { id: 4, name: "Jeans", category: "Clothing", price: 40 },
    { id: 5, name: "Coffee Maker", category: "Home Appliances", price: 70 },
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilter = (filters) => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    if (filters.price) {
      filtered = filtered.filter((product) => product.price <= filters.price);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="app">
      <h1>Product Filter</h1>
      <Filter onFilter={handleFilter} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default App;
