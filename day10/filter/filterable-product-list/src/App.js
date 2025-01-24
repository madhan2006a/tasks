import React, { useState, useMemo, useCallback } from "react";

const fakeApi = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Smartphone", price: 800 },
  { id: 3, name: "Headphones", price: 150 },
  { id: 4, name: "Smartwatch", price: 200 },
  { id: 5, name: "Tablet", price: 300 },
];

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  // Memoize the filtered product list
  const filteredProducts = useMemo(() => {
    return fakeApi.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Memoized function to clear the search
  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  // Function to add items to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Filterable Product List</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
      />
      <button onClick={clearSearch} style={{ marginLeft: "10px" }}>
        Clear Search
      </button>

      {/* Product count */}
      <p>
        <strong>Filtered Products Count:</strong> {filteredProducts.length}
      </p>

      {/* Product list */}
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id} style={{ margin: "10px 0" }}>
            <span>
              {product.name} - ${product.price}
            </span>
            <button
              onClick={() => addToCart(product)}
              style={{ marginLeft: "10px" }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      {/* Cart */}
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
