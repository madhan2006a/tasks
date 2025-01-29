import React from 'react';
import './Cart.css';

function Cart({ cartItems, removeFromCart }) {
  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <span>{item.name}</span>
              <button onClick={() => removeFromCart(item)} className="remove-button">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;