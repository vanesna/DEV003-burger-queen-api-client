import React from "react";
import '../kitchen/kitchen.css';

export default function ButtonNavBar({ value, text, onClick, isActive }) {
    return (
        <button
            onClick={onClick}
            value={value}
            className={isActive ? "active" : ""}
        >
            {text}
        </button>
    )
}