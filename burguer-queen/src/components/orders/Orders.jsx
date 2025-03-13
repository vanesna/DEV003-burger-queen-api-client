import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Header/header';
import NavBarOrders from './NavBar-orders';
import CardsOrders from '../cardsOrders/cardsOrders';
import axios from 'axios';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("delivering");  // Estado para el filtro actual

    // Función para obtener órdenes según el estado seleccionado
    const getOrders = useCallback(async (status) => {
        try {
            const token = localStorage.getItem('sessionToken');
            const response = await axios.get(`http://localhost:8080/orders?status=${status}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setOrders(response.data);
        } catch (error) {
            console.error("❌ Error obteniendo órdenes:", error);
        }
    }, []);

    // Manejar cambio de estado (filtrado de órdenes)
    const handleOrderStatus = (newStatus) => {
        setStatus(newStatus);  // Actualizamos el estado del filtro
        getOrders(newStatus);  // Cargamos nuevas órdenes
    };

    const handleToDelivered = async (order) => {
        try {
            const token = localStorage.getItem('sessionToken');
            const updatedOrder = { ...order, status: 'delivered' };
    
            await axios.put(`http://localhost:8080/orders/${order.id}`, updatedOrder, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            // Actualizar la lista de órdenes después de cambiar el estado
            getOrders('delivering');  // Recargar la lista de órdenes entregándose
        } catch (error) {
            console.error("❌ Error actualizando orden:", error);
        }
    };
        

    // Cargar órdenes al montar el componente
    useEffect(() => {
        getOrders(status);
    }, [getOrders, status]);

    return (
        <div>
            <Header />
            <NavBarOrders handleOrderStatus={handleOrderStatus} activeStatus={status} />
            <CardsOrders orders={orders} handleToDelivered={handleToDelivered} />
        </div>
    );
}
