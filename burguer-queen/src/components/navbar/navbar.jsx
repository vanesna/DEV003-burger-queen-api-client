import React from 'react';
import './navbar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="client-name">
        <input type="text" placeholder="Customer" />
      </div>
      <div className="button-group">
        <button className="breakfast">Breakfast</button>
        <button className="joined-button">Lunch</button>
        <button className="cart">
          <i className="bi bi-cart3"></i>
        </button>
      </div>
    </nav>
  );
}
