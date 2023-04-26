import React from 'react';
import logo from '../../assets/home.jpg';
import './header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const backgroundImageStyle = {
    backgroundImage: `url(${logo})`,
  };
  const logout = () => {
    localStorage.removeItem('sessionUser');
    localStorage.removeItem('sessionToken');
    return navigate('/login', { replace: true });
  };
  return (
    <header className="backgroundHeader" style={backgroundImageStyle}>
      <p className="textHeader">Burger Queen</p>
      <button onClick={logout}>Logout</button>
    </header>
  );
}

export default Header;
