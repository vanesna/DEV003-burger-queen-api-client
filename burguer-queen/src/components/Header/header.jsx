import React from 'react';
import logo from '../../assets/home.jpg';
import './header.css'

function Header() {

    const backgroundImageStyle = {
        backgroundImage: `url(${logo})`
    };

    return (
        <header className="backgroundHeader" style={backgroundImageStyle}>
            <p className='textHeader'>Burger Queen</p>
        </header>
    )
}


export default Header;
