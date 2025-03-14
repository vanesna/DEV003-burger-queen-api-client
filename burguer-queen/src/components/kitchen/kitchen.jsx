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
            const res = await axios.get(`http://localhost:8080/orders?status=${status}`, {
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

    // Maneja solo los clics en los botones
    function handleOrderStatus(e) {
        const status = e.target.value;
        getOrders(status);
    }

    // Carga inicial de órdenes con estado "pending"
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
