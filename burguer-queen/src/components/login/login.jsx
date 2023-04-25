import logo from '../../assets/home.jpg';
import React, { useState, useEffect } from 'react';
import './login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onNavigate = useNavigate(); 

  // useEffect(() => {
  //   api.get(urlUsers).then((res) =>
  //     console.log(res))
  // });

  // axios({
  //   method: 'get',
  //   url: 'http://localhost:8080/users',
  //   headers: {'X-Custom-Header': 'foobar'}
  // })
  //   .then(function (response) {
  //     console.log('response axios', response.data.accessToken);
  //   });

  const backgroundImageStyle = {
    backgroundImage: `url(${logo})`
  };
  const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log(data);
    axios.post('http://localhost:8080/login', data)
      .then(function (response) {
        console.log('token', response.data.accessToken);
        console.log('user', response.data.user);
        const token = response.data.accessToken;
        const currentUser = response.data.user;
        localStorage.setItem('accessToken', token)
        localStorage.setItem('currentUser', JSON.stringify(response.data.user))
        if(currentUser.role === 'waiter'){
          alert('welcome');
          onNavigate('/menu');
        }
      })
      .catch(function (error) {
        console.log(error);   
      });

  }

  return (
    <div className="background-image" style={backgroundImageStyle}>
      <h3 className="heading">Burger Queen</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container'>
          <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} {...register('email', {
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            required: true,
          })} />
          {errors.email?.type === 'pattern' && <p className="text-danger">Invalid Email Adress</p>}
          {errors.email?.type === 'required' && <p className="text-danger">Required</p>}

          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} {...register('password', {
            pattern: /^[0-9]+$/i,
            required: true,
            minLength: 6,
            maxLength: 20,
          })} />
          {errors.password?.type === 'pattern' && <p className="text-danger">Invalid Password</p>}
          {errors.password?.type === 'required' && <p className="text-danger">Required</p>}
          <input type='submit' value='Login' className='login-button' />
        </div>
      </form>
    </div>
  );
}
