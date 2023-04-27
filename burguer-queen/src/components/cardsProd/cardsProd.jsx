import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CardsProd() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts(setProducts)
    }, [])


    async function getProducts() {

        const token = localStorage.getItem('sessionToken');
        //console.log('token: ', token);

        await axios.get('http://localhost:8080/products', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                const response = res.data;
                setProducts(response);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <>
            {products.map((product) => {
                return (
                    <div key={product.id}>
                        <img src={product.image} alt=''/>
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                    </div>
                )
            }
            )}
        </>
    )
};