import React, { useEffect, useState } from 'react';
import Header from '../Header/header';
import axios from 'axios';
import './kitchen.css'

export default function Kitchen() {

    const [orders, setOrders] = useState([]);
    // const [products, setProducts] = useState([]);

    useEffect(() => {
        getOrders(setOrders)
    }, [])


    async function getOrders() {

        const token = localStorage.getItem('sessionToken');
        //console.log('token: ', token);

        await axios.get('http://localhost:8080/orders', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log('res: ', res.data);
                const response = res.data;
                setOrders(response);
            })
            .catch((error) => {
                console.error(error)
            })
    }


    return (
        <div>
            <Header />
            <h1>Orders</h1>
            <div className='containerOrders'>
                {orders.map((order) => {                
                    return (
                        <div className='cardOrder' key={order.id}>
                            <h2>{order.client}</h2>
                            {order.products.map((products) => {
                                return (
                                    <div key={products.id}>
                                        <h3>{products.qty} {products.product.name}</h3>                                        
                                    </div>
                                )
                            })}                        
                            <h4>Entry: {order.dataEntry}</h4>
                            <button>Deliver</button>
                        </div>
                    )
                }
                )}
            </div >
        </div>
    );
}