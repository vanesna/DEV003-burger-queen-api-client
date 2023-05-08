import React from 'react';

import '../navbar/NavBar.css';
import './kitchen.css';

export default function NavBarKitchen({handleOrderStatus}) {


    return (
        <nav className="navbar">
            <div className="button-group">
                <button className="button-orders" value='pending' onClick={(e) => handleOrderStatus(e)}>In process</button>
                <button className="button-orders" value='delivered' onClick={(e) => handleOrderStatus(e)}>Ready</button>
            </div>
        </nav>
    );
}