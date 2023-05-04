import React from 'react';

import '../navbar/NavBar.css';
import './kitchen.css';

export default function NavBarKitchen(){


    return (
        <nav className="navbar">
            <div className="button-group">
                <button className="button-orders">In process</button>
                <button className="button-orders">Ready</button>
            </div>
        </nav>
    );
}