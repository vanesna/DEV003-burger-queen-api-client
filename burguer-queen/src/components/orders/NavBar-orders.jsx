import React from 'react';
import ButtonNavBar from '../button-Navbar/button-Navbar';
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
            <ButtonNavBar
                    value='delivering'
                    text='Ready'
                    onClick={handleOrderStatus}
                />
                <ButtonNavBar
                    value='delivered'
                    text='Delivered'
                    onClick={handleOrderStatus}
                />
            </div>
        </nav>
    );
}