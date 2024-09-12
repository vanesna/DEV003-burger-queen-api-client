import React from 'react';
import './cardsProd.css';

export default function CardsProd({
  products,
  handleAddToOrder,
  handleRemoveFromOrder,
  productQuantities,
}) {
  return (
    <>
      <div className="containerMenu">
        {products.map((product) => {
          const productId = product.id;

          return (
            <div className="card" key={productId}>
              <img src={product.image} alt="" />
              <h3>{product.name}</h3>
              <h3 className="cardPrice">${product.price}</h3>
              <div className="quantity">
                <button
                  className="cardBtnMore"
                  onClick={() => {
                    handleAddToOrder(productId);
                  }}
                >
                  +
                </button>
                <p className="cardInput">{productQuantities[productId] || 0}</p>
                <button
                  className="cardBtnLess"
                  onClick={() => {
                    handleRemoveFromOrder(productId);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
