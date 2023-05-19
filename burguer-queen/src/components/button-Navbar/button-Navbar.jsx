import React from "react";
import '../kitchen/kitchen.css';

export default function ButtonNavBar({ value, text, onClick }) {
    return (
        <button
        
        onClick={(e) => onClick(e)}
            value={value}>
            {text}
        </button>
    )
}