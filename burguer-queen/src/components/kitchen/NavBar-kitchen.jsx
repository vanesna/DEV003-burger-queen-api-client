import React, { useState, useEffect } from 'react';
// import '../navbar/NavBar.css';
// import './kitchen.css';
import ButtonNavBar from '../button-Navbar/button-Navbar';


export default function NavBarKitchen({ handleOrderStatus }) {


    const [activeButton, setActiveButton] = useState("pending");

    useEffect(() => {
      
            handleOrderStatus({ target: { value: "pending" } });
        }, [handleOrderStatus]);

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