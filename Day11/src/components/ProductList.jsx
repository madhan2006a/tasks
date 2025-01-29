import React from 'react';
import './ProductList.css';

function ProductList({ products, addToCart }) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-item">
          <img src={product.image} alt={product.name} className="product-image" />
          <span>{product.name}</span>
         
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;