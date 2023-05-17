import React from 'react';
import NavBarKitchen from '../kitchen/NavBar-kitchen';
import { useNavigate } from 'react-router-dom';
import './orders.css';

export default function NavBarOrders({ handleOrderStatus }) {


    const navigate = useNavigate();


    return (
        <nav className="navbar-orders">
            <div className="button-group-orders">
            <button className='BackToMenu' onClick={() => navigate('/menu')}>
                <i className="bi bi-arrow-left"></i> Menu
            </button>
            <NavBarKitchen handleOrderStatus={handleOrderStatus} />
            </div>
        </nav>
    );
}