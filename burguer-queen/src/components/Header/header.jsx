import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/home.jpg';
import './header.css';

function Header() {

  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const userRole = localStorage.getItem('userRole');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = () => {
    localStorage.removeItem('sessionUser');
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userRole');
    navigate('/login', { replace: true });
  };

  return (
    <header className="backgroundHeader" style={{ backgroundImage: `url(${logo})` }}>
      <p className="textHeader">Burger Queen</p>
      <div className="menu-container">
        <button className="menu-btn" onClick={toggleMenu}>
          <i className="bi bi-list"></i>
        </button>
        {menuOpen && (
          <ul className="dropdown-menu">
            {(userRole === 'Admin' || userRole === 'Waiter') && (
              <li className={location.pathname === '/menu' ? 'active' : ''} onClick={() => navigate('/menu')}>Menu</li>
            )}
            {(userRole === 'Admin' || userRole === 'Chef') && (
              <li className={location.pathname === '/kitchen' ? 'active' : ''} onClick={() => navigate('/kitchen')}>Kitchen</li>
            )}
            {(userRole === 'Admin') && (
              <li className={location.pathname === '/products' ? 'active' : ''} onClick={() => navigate('/products')}>Products</li>
            )}
            {(userRole === 'Admin') && (
              <li className={location.pathname === '/users' ? 'active' : ''} onClick={() => navigate('/users')}>Users</li>
            )}            
            <li onClick={logout}>Log Out</li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
