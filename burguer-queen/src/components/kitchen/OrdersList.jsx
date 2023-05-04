import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './kitchen.css'

export default function OrderList() {

    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

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

    const toDeliver = () => {
        console.log(new Date());
        alert('Order Ready: '+ new Date());
    } 


    return (
        <div>
            <main className='containerOrders'>
                {orders.map((order) => {
                    if (order.status === 'pending') {
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
                                <button onClick={() => toDeliver()}>Deliver</button>
                            </div>
                        )
                    }
                }
                )}
            </main >
        </div>
    );
}