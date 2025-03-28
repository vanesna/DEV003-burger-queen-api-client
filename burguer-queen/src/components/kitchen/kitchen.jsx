import React, { useState, useEffect } from 'react';
import Header from '../Header/header';
import NavBarKitchen from './NavBar-kitchen';
import axios from 'axios';
import CardsOrders from '../cardsOrders/cardsOrders';

export default function Kitchen() {
    const [orders, setOrders] = useState([]);

    async function getOrders(status) {
        const token = localStorage.getItem('sessionToken');
        try {
            const res = await axios.get(`https://burger-queen-mock-zjbl.onrender.com/orders?status=${status}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setOrders(res.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    function handleOrderStatus(e) {
        const status = e.target.value;
        getOrders(status);
    }

    useEffect(() => {
        getOrders('pending');
    }, []);

    return (
        <div>
            <Header />
            <h1>Orders</h1>
            <NavBarKitchen handleOrderStatus={handleOrderStatus} />
            <CardsOrders orders={orders} handleToDelivered={() => getOrders('pending')}/>
        </div>
    );
}
