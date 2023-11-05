import React from 'react';
import './Order.css';

export default function OrderForm({ submitOrder, productsInOrder }) {
  const totalPrice = productsInOrder.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  return (
    <div className="order-content">
      <h1>Order</h1>
      <form onSubmit={submitOrder}>
        {productsInOrder.map((product) => (
          <div key={product.id} className="order-product">
            <span className="order-quantity">{product.quantity}</span>
            <span className="order-product-name">{product.name}</span>
            <span className="order-product-price">
              $ {product.price * product.quantity}
            </span>
          </div>
        ))}
        <div className="order-total">
          <span className='"order-product-total'>TOTAL:</span>{' '}
          <span>${totalPrice}</span>
        </div>
        <div className="order-btn">
          <button type="submit">Confirm</button>
        </div>
      </form>
    </div>
  );
}
