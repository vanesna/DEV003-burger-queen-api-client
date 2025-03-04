import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({
  handleMenu,
  setModalIsOpen,
  handleCustomerName,
}) {

  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Breakfast"); // Estado para el botón activo

  const handleButtonClick = (event) => {
    const value = event.target.value;
    setActiveButton(value); // Actualiza el estado con el botón seleccionado
    handleMenu(event); // Llama a la función original para manejar el menú
  };

  return (
    <nav className="navbar">
      <div className="customer">
        <input
          type="text"
          placeholder="Customer's name"
          onChange={handleCustomerName}
        />
      </div>
      <div className="button-group">
        <button
          value="Breakfast"
          className={`menu-btn ${activeButton === "Breakfast" ? "active" : ""}`}
          onClick={handleButtonClick}
        >
          Breakfast
        </button>
        <button
         value="Lunch"
         className={`menu-btn ${activeButton === "Lunch" ? "active" : ""}`}
         onClick={handleButtonClick}
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
