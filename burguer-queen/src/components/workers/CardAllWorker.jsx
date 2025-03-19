import React, { useState } from 'react';
import axios from 'axios';

import OrderModal from '../UI/Modal';
import SingleWorker from './SingleWorker';
import AlertDelete from '../AlertDelete/alertDelete';
import './CardWorker.css';

export default function CardAllWorker({ setModalIsOpen, workers, getWorkers }) {

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteUser = async (UserId) => {
    const token = localStorage.getItem('sessionToken');
    try {
      await axios.delete(`https://burger-queen-mock-zjbl.onrender.com/users/${UserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      getWorkers(); // ✅ Refrescar lista de productos
      setDeleteModalIsOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <>
      <div className='containerMenu'>
        {workers.map((worker) => (
          <div key={worker.id} className="card-workers">
            <img src={worker.image} alt="" />
            <p>{worker.email}</p>
            <p>{worker.role}</p>
            <div className="card-workers-btns">
              <button
                onClick={() => {
                  setSelectedUser(worker);
                  setEditModalIsOpen(true);
                }}
              >
                <i className="bi bi-pen"></i>
              </button>
              <button
                onClick={() => {
                  setSelectedUser(worker);
                  setDeleteModalIsOpen(true);
                }}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal para editar */}
      <OrderModal modalIsOpen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen}>
        {selectedUser && (
          <SingleWorker
            worker={selectedUser}
            closeModal={() => setEditModalIsOpen(false)}
            refreshWorkers={getWorkers}
          />
        )}
      </OrderModal>

      {/* ✅ Modal para eliminar */}
      <OrderModal modalIsOpen={deleteModalIsOpen} setModalIsOpen={setDeleteModalIsOpen}>
        {selectedUser && (
          <AlertDelete
            item={selectedUser}
            confirmDelete={() => handleDeleteUser(selectedUser.id)}
            closeModal={() => setDeleteModalIsOpen(false)}
          />
        )}
      </OrderModal>
    </>
  );
}
