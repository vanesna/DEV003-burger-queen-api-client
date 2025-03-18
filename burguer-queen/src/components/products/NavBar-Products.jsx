import React from "react";
import './products.css'


export default function NavBarProducts({setModalIsOpen}) {
    return (
        <nav className="buttonToAdd">
            <button onClick={() => setModalIsOpen(true)}>add</button>
        </nav>
    )
}