//import React, { useEffect, useState } from 'react';
import '../kitchen/kitchen.css'
import moment from 'moment';

export default function CardsOrders({orders,  handleToDelivering}) {

    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;


    function OrderStatus({ singleOrder, status }) {
        if (status === 'pending') {
            return <button onClick={() =>  handleToDelivering(singleOrder)}>Deliver</button>
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
                    {orders.map((order) => {
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