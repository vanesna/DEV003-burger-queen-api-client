import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/header';
import CardWorker from './CardWorker';

export default function Users() {
  const [workers, setWorkers] = useState([]);

  const getWorkers = () => {
    const token = localStorage.getItem('sessionToken');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get('http://localhost:8080/users', { headers })
      .then((res) => {
        const response = res.data;
        console.log(response);
        setWorkers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getWorkers();
  }, []);

  return (
    <div>
      <Header />
      <CardWorker workers={workers} />
    </div>
  );
}
