// import React, { useState } from 'react';
import './cardsProd.css';

export default function CardsProd({ products, handleAddToOrder }) {
  return (
    <>
      <div className="containerMenu">
        {products.map((product) => {
          return (
            <div className="card" key={product.id}>
              <img src={product.image} alt="" />
              <h3>{product.name}</h3>
              <h3 className="cardPrice">${product.price}</h3>
              <div className="quantity">
                <button
                  className="cardBtnMore"
                  onClick={() => handleAddToOrder(product.id)}
                >
                  +
                </button>
                {/* {counter} */}
                <input className="cardInput" type="number" defaultValue={0} />
                <button className="cardBtnLess">-</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
