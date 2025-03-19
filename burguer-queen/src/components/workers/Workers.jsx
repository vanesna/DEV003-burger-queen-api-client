import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/header';
import NavWorker from './NavWorkers';
import CardAllWorker from './CardAllWorker';
import OrderModal from '../UI/Modal';
import SingleWorker from './SingleWorker';

export default function Users() {

  const [workers, setWorkers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getWorkers = () => {
    const token = localStorage.getItem('sessionToken');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get('https://burger-queen-mock-zjbl.onrender.com/users', { headers })
      .then((res) => {
        const response = res.data;
        //console.log(response);
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
    <>
      <Header />
      <NavWorker setModalIsOpen={setModalIsOpen} />
      <CardAllWorker setModalIsOpen={setModalIsOpen} workers={workers} getWorkers={getWorkers} />

      <OrderModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <SingleWorker closeModal={() => setModalIsOpen(false)} refreshWorkers={getWorkers} />
      </OrderModal>
    </>
  );
}
