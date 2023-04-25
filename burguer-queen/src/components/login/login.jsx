import logo from '../../assets/home.jpg';
import React, { useState, useEffect } from 'react';
import './login.css';
import { useForm } from 'react-hook-form';
import { helpHttp } from '../../helpers/helpHttp'

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let api = helpHttp();
  let urlUsers = 'http://localhost:8080/users'

  // useEffect(() => {
  //   api.get(urlUsers).then((res) =>
  //     console.log(res))
  // });

  const backgroundImageStyle = {
    backgroundImage: `url(${logo})`
  };
  const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className="background-image" style={backgroundImageStyle}>
      <h3 className="heading">Burguer Queen</h3>
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
          {errors.email?.type === 'pattern' && <p className="text-danger">Invalid Password</p>}
          {errors.email?.type === 'required' && <p className="text-danger">Required</p>}
          <input type='submit' value='Login' className='login-button' />
        </div>
      </form>
    </div>
  );
}
