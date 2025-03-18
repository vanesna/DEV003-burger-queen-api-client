import React from 'react';
import ButtonNavBar from '../button-Navbar/button-Navbar';
import { useNavigate } from 'react-router-dom';
import './orders.css';

export default function NavBarOrders({ handleOrderStatus, activeStatus }) {
    const navigate = useNavigate();

    return (
        <nav className="navbar-orders">
            <div className="buttonToMenu">
                <button onClick={() => navigate('/menu')}>
                    <i className="bi bi-arrow-left"></i> Menu
                </button>
            </div>
            <div className="button-group-orders">
                <ButtonNavBar
                    value="delivering"
                    text="Ready"
                    onClick={() => handleOrderStatus("delivering")}  
                    isActive={activeStatus === "delivering"}
                />
                <ButtonNavBar
                    value="delivered"
                    text="Delivered"
                    onClick={() => handleOrderStatus("delivered")}
                    isActive={activeStatus === "delivered"}
                />
            </div>
        </nav>
    );
}
