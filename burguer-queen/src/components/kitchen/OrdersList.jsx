// //import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './kitchen.css'
// import moment from 'moment';
// import CardsOrders from '../cardsOrders/cardsOrders';

// export default function OrdersList({ ordersFil }) {

//     const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

//     const toDeliver = (order) => {

//         const token = localStorage.getItem('sessionToken');

//         let id = order.id

//         let d = new Date();
//         let formatteddatestr = moment(d).format('hh:mm a');

//         order.status = 'delivering';
//         order.dateProcessed = formatteddatestr


//         axios.put(`http://localhost:8080/orders/${id}`, order, {

//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         })
//     }

//     function OrderStatus({ singleOrder, status }) {
//         if (status === 'pending') {
//             return <button onClick={() => toDeliver(singleOrder)}>Deliver</button>
//         }
//         else {

//             let startTime = moment(singleOrder.dataEntry, 'hh:mm a');
//             let endTime = moment(singleOrder.dateProcessed, 'hh:mm a');
//             let totalTime = endTime.diff(startTime, 'minutes');

//             return (
//                 <>
//                     <p>Departure: {singleOrder.dateProcessed}</p>
//                     <p className='totalTime'>Total time: {totalTime} minutes</p>
//                 </>

//             )
//         }
//     }

//     return (
//         <>
//             <div>             
//                     {ordersFil.map((order) => {
//                         return (
//                             < CardsOrders
//                                 key={order.id}
//                                 client={order.client}
//                                 // {order.products.map((products) => {
//                                 //     return (
//                                 //         key = { products.id }
//                                 //     qty = { products.qty }
//                                 //     nameP = { products.product.name }
//                                 // )
//                                 // })}
//                             />   
//                         )
//                         < p > Entry: {order.dataEntry}</p>
//                 <OrderStatus
//                     status={order.status}
//                     singleOrder={order}
//                 />
//                     })}
//             </div >
//         </>
//     );
// }