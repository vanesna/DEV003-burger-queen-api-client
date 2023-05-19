import React, { useState, useEffect } from 'react';
import Header from '../Header/header';
import NavBarOrders from './NavBar-orders';
import CardsOrders from '../cardsOrders/cardsOrders';
import axios from 'axios';

export default function Orders() {

    //const [status, setStatus] = useState('pending');
    const [orders, setOrders] = useState([]);
    //console.log('orders: ', orders);


    async function getOrders (status) {

        const token = localStorage.getItem('sessionToken');
        //console.log('token: ', token);

        await axios.get(`http://localhost:8080/orders?status=${status}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                //console.log('res: ', res.data);
                const response = res.data;
                setOrders(response);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    async function handleOrderStatus (e) {
        e.preventDefault();
        const status = e.target.value;
        getOrders(status);
    }

    async function toDelivered  (order)  {

        const token = localStorage.getItem('sessionToken');

        let id = order.id

        order.status = 'delivered';


        await axios.put(`http://localhost:8080/orders/${id}`, order, {

            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    }

    useEffect(() => {
        getOrders('delivering')
    }, [])


    return (
        <div>
            <Header />
            {/* <h1>Orders</h1> */}
            <NavBarOrders 
            handleOrderStatus={handleOrderStatus} />
            <CardsOrders 
            orders={orders}
            handleToDelivering={toDelivered} />

        </div>
    );
}