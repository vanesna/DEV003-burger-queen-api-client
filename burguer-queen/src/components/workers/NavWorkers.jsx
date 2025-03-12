import React from 'react';
import './CardWorker.css';

export default function NavWorker({ setModalIsOpen }) {  // Asegurar que se recibe setModalIsOpen como prop
  return (
    <nav className="buttonToAdd">
      <button onClick={() => setModalIsOpen(true)}>add</button>
    </nav>
  );
}
