import React from 'react';
// import '../navbar/NavBar.css';
// import './kitchen.css';
import ButtonNavBar from '../button-Navbar/button-Navbar';


export default function NavBarKitchen({ handleOrderStatus }) {


    return (
        <nav className="navbar-kitchen">
            <div className="button-group-kitchen">
                <ButtonNavBar
                    value='pending'
                    text='In process'
                    onClick={handleOrderStatus}
                />
                <ButtonNavBar
                    value='delivering'
                    text='Ready'
                    onClick={handleOrderStatus}
                />            
            </div>
        </nav>
    );
}