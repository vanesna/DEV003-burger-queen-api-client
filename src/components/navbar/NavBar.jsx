import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({
  handleMenu,
  setModalIsOpen,
  handleCustomerName,
}) {

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="customer">
        <input
          type="text"
          placeholder="Customer"
          onChange={handleCustomerName}
        />
      </div>
      <div className="button-group">
        <button
          value="Breakfast"
          className="menu-btn"
          onClick={(event) => handleMenu(event)}
        >
          Breakfast
        </button>
        <button
          value="Lunch"
          className="menu-btn"
          onClick={(event) => handleMenu(event)}
        >
          Lunch
        </button>
        <button className="order" onClick={() => setModalIsOpen(true)}>
          <i className="bi bi-clipboard2"></i>
        </button>
        <button className="order" onClick={() => navigate('/orders')}>
          <i className="bi bi-clipboard2-check"></i>
        </button>
      </div>
    </nav>
  );
}
