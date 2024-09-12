import React, { useState } from "react";
import "./CardWorker.css";

export default function CardWorker({ workers, deleteWorker }) {
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
              <button onClick={(e) => deleteWorker(worker.id, e)}>
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
