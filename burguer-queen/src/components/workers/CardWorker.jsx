import React, { useState } from 'react';
import axios from 'axios';
import './CardWorker.css';

export default function CardWorker({ workers }) {
  return (
    <section id="workers">
      {workers.map((worker) => {
        return (
          <div key={worker.id} className="card-workers">
            <img src={worker.image} alt="" />
            <p>{worker.email}</p>
            <p>{worker.role}</p>
            <div className="card-workers-btns">
              <button>
                <i className="bi bi-pen"></i>
              </button>
              <button>
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
