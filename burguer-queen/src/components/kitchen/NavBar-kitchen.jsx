import React from 'react';

import '../navbar/NavBar.css';
import './kitchen.css';

export default function NavBarKitchen({handleOrderStatus}) {


    return (
        <nav className="navbar-kitchen">
            <div className="button-group-kitchen">
                <button className="button-orders-kitchen" value='pending' onClick={(e) => handleOrderStatus(e)}>In process</button>
                <button className="button-orders-kitchen" value='delivering' onClick={(e) => handleOrderStatus(e)}>Ready</button>
            </div>
        </nav>
    );
}