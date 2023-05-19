import React, { useState, useEffect } from 'react';
import Header from '../Header/header';
import NavBarKitchen from './NavBar-kitchen';
import axios from 'axios';
import CardsOrders from '../cardsOrders/cardsOrders';

export default function Kitchen() {

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



    useEffect(() => {
        getOrders('pending')
    }, [])


    return (
        <div>
            <Header />
            <h1>Orders</h1>
            <NavBarKitchen 
            handleOrderStatus={handleOrderStatus} />
            <CardsOrders 
            orders={orders}
            />

        </div>
    );
}