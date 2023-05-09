//import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './kitchen.css'
import moment from 'moment';

export default function OrdersList({ ordersFil }) {

    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

    const toDeliver = (order) => {

        const token = localStorage.getItem('sessionToken');

        let id = order.id

        let d = new Date();
        let formatteddatestr = moment(d).format('hh:mm a');

        order.status = 'delivering';
        order.dateProcessed = formatteddatestr


        axios.put(`http://localhost:8080/orders/${id}`, order, {

            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    }

    function OrderStatus({ singleOrder, status }) {
        if (status === 'pending') {
            return <button onClick={() => toDeliver(singleOrder)}>Deliver</button>
        }
        else {

            let startTime = moment(singleOrder.dataEntry, 'hh:mm a');
            let endTime = moment(singleOrder.dateProcessed, 'hh:mm a');
            let totalTime = endTime.diff(startTime, 'minutes');

            return (
                <>
                    <p>Departure: {singleOrder.dateProcessed}</p>
                    <p className='totalTime'>Total time: {totalTime} minutes</p>            
                </>

            )
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