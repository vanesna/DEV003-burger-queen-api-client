import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({ handleMenu, setModalIsOpen, handleCustomerName, customer }) {
  
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('Breakfast');
  const [customerName, setCustomerName] = useState(customer || '');

  useEffect(() => {
    setCustomerName(customer); 
  }, [customer]);

  const handleInputChange = (event) => {
    setCustomerName(event.target.value);
    handleCustomerName(event); 
  };

  return (
    <nav className="navbar">
      <div className="customer">
        <input
          type="text"
          placeholder="Customer's name"
          value={customerName}  
          onChange={handleInputChange}
        />
      </div>
      <div className="button-group">
        <button
          value="Breakfast"
          className={`menu-btn ${activeButton === 'Breakfast' ? 'active' : ''}`}
          onClick={(event) => {
            setActiveButton(event.target.value);
            handleMenu(event);
          }}
        >
          Breakfast
        </button>
        <button
          value="Lunch"
          className={`menu-btn ${activeButton === 'Lunch' ? 'active' : ''}`}
          onClick={(event) => {
            setActiveButton(event.target.value);
            handleMenu(event);
          }}
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
