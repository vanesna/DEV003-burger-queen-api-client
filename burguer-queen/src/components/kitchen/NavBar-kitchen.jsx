import React, { useState } from 'react';
import ButtonNavBar from '../button-Navbar/button-Navbar';

export default function NavBarKitchen({ handleOrderStatus }) {
    const [activeButton, setActiveButton] = useState("pending");

    const handleButtonClick = (event) => {
        const value = event.target.value;
        setActiveButton(value);
        handleOrderStatus(event);
    };

    return (
        <nav className="navbar-kitchen">
            <div className="button-group-kitchen">
                <ButtonNavBar
                    value='pending'
                    text='In process'
                    onClick={handleButtonClick}
                    isActive={activeButton === "pending"}
                />
                <ButtonNavBar
                    value='delivering'
                    text='Ready'
                    onClick={handleButtonClick}
                    isActive={activeButton === "delivering"}
                />            
            </div>
        </nav>
    );
}
