import React from 'react';
import Product from './OrderList.jsx';

export default function OrderForm({ submitOrder, productsInOrder }) {
  return (
    <div>
      <h1>Order</h1>
      <form onSubmit={submitOrder}>
        {productsInOrder.map((product) => (
          <Product product={product} />
        ))}
        {/* cantidad / producto / precio / borrar*/}
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
}
