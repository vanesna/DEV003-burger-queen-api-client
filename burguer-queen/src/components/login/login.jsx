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
      .post('http://localhost:8080/login', data, httpConfig)
      .then((response) => {
        const { accessToken, user } = response.data;
        //console.log('respose axios', response.data);
        localStorage.setItem('sessionUser', JSON.stringify(user));
        localStorage.setItem('sessionToken', accessToken);
        console.log('Welcome!');
        navigate('/menu');
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
          <p>{errors.email?.message}</p>
          <input
            type="password"
            placeholder="password"
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
          <p>{serverError}</p>
          <input type="submit" value="Login" className="login-button" />
        </div>
      </form>
    </div>
  );
}
