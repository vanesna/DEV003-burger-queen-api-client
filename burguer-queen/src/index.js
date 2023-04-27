import React from 'react';
import { createRoot } from 'react-dom/client';
import Login from './components/login/login';
import Menu from './components/menu/menu';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Component, ...rest }) {
  const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
  const sessionToken = localStorage.getItem('sessionToken');
  console.log({ sessionToken, sessionUser });
  if (sessionToken) return <Component {...rest} />;
  else return <Navigate to="/login" replace state={{ from: rest.location }} />;
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<PrivateRoute element={Menu} />} />
        <Route path="/" element={<Navigate to="/menu" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
