import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cardsProd.css'

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
            <div className='containerMenu'>
                {products.map((product) => {
                    return (

                        <div className='card' key={product.id}>
                            <img src={product.image} alt='' />
                            <h3 >{product.name}</h3>
                            <h3 className='cardPrice'>${product.price}</h3>
                            <div className='quantity'>
                                <button className='cardBtnMore'>+</button>
                                <input className='cardInput' type='number' value={0} />
                                <button className='cardBtnLess'>-</button>
                            </div>

                        </div>

                    )
                }
                )}
            </div >
        </>
    )
};