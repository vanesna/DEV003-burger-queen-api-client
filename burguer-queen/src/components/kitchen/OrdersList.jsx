//import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './kitchen.css'

export default function OrdersList({ ordersFil }) {

    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

    const toDeliver = (order) => {
        console.log(new Date());
        alert('Order Ready: ' + new Date());

        const token = localStorage.getItem('sessionToken');

        let id = order.id

        order.status = 'delivered';


        axios.put(`http://localhost:8080/orders/${id}`, order, {

            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    }

    function OrderStatus({singleOrder, status}) {
        if(status === 'pending') {
            return <button onClick={() => toDeliver(singleOrder)}>Deliver</button>
        }
    }


    return (
        <>
            <div>
                <main className='containerOrders'>
                    {ordersFil.map((order) => {                       
                        return (
                            <div className='cardOrder' key={order.id}>
                                <h3>{order.client}</h3>
                                {order.products.map((products) => {
                                    return (
                                        <div key={products.id}>
                                            <h4 className='productsOrder'>{products.qty}{tab}{products.product.name}</h4>
                                        </div>
                                    )
                                })}
                                <p>Entry: {order.dataEntry}</p>            
                                <OrderStatus 
                                status={order.status}
                                singleOrder={order}
                                />
                            </div>
                        )
                    }
                    
                    )}
                
                </main >
            </div>
        </>
    );
}