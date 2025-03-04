import React, { useState, useEffect } from 'react';
import ButtonNavBar from '../button-Navbar/button-Navbar';
import { useNavigate } from 'react-router-dom';
import './orders.css';

export default function NavBarOrders({ handleOrderStatus }) {

    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState("delivering"); // "Ready" activo por defecto

    useEffect(() => {
        // Llamar a handleOrderStatus con "delivering" cuando la página carga
        handleOrderStatus({ target: { value: "delivering" } });
    }, [handleOrderStatus]);

    const handleButtonClick = (event) => {
        const value = event.target.value;
        setActiveButton(value);
        handleOrderStatus(event);
    };

    return (
        <nav className="navbar-orders">
            <div className="buttonToMenu">
                <button onClick={() => navigate('/menu')}>
                    <i className="bi bi-arrow-left"></i> Menu
                </button>
            </div>
            <div className="button-group-orders">
                <ButtonNavBar
                    value='delivering'
                    text='Ready'
                    onClick={handleButtonClick}
                    isActive={activeButton === "delivering"}
                />
                <ButtonNavBar
                    value='delivered'
                    text='Delivered'
                    onClick={handleButtonClick}
                    isActive={activeButton === "delivered"}
                />
            </div>
        </nav>
    );
}