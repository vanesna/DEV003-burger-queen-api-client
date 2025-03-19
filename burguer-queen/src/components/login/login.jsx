import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import './login.css';
import logo from '../../assets/home.jpg';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(15).required(),
});

export default function Home() {
  const backgroundImageStyle = {
    backgroundImage: `url(${logo})`,
  };
  const [serverError, setServerError] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = (data) => {
  const httpConfig = { headers: { 'Content-Type': 'application/json' } };
  axios
    .post('https://burger-queen-mock-zjbl.onrender.com/login', data, httpConfig)
    .then((response) => {
      const { accessToken, user } = response.data;        
      
      // Guardar el rol en localStorage
      localStorage.setItem('sessionUser', JSON.stringify(user));
      localStorage.setItem('sessionToken', accessToken);
      localStorage.setItem('userRole', user.role); // Asegúrate de que la API devuelva el rol
      
      console.log('Welcome!');

      // Redirigir según el rol
      if (user.role === 'Admin') {
        navigate('/products');
      } else if (user.role === 'Chef') {
        navigate('/kitchen');
      } else if (user.role === 'Waiter') {
        navigate('/menu');
      }
    })
    .catch((error) => {
      console.error(error.response);
      setServerError(error.response.data);
    });
};

  return (
    <div className="background-image" style={backgroundImageStyle}>
      <h3 className="heading">Burger Queen</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <input type="text" placeholder="email" {...register('email')} />
          <span className="error-text">{errors.email?.message}</span>
          <input
            type="password"
            placeholder="password"
            {...register('password')}
          />
          <span className="error-text">{errors.password?.message}</span>
          <span className="error-text">{serverError}</span>
          <input type="submit" value="Login" className="login-button" />
        </div>
      </form>
    </div>
  );
}
