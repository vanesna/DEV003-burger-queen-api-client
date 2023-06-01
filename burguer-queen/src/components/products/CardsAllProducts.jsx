import React, { useState, useEffect } from 'react';
import axios from 'axios';

import OrderModal from '../UI/Modal';
import AlertDelete from '../AlertDelete/alertDelete';
import '../cardsProd/cardsProd.css';
import './products.css'

export default function CardsAllProducts() {

    const [allProducts, setAllProducts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const getAllProducts = async () => {
        const token = localStorage.getItem('sessionToken');
        await axios
            .get('http://localhost:8080/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                const response = res.data;
                setAllProducts(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    function handleEditProduct() {
        console.log('edit');
    }

    return (
        <>
            <div className="containerMenu">
                {allProducts.map((product) => {
                    const productId = product.id;

                    return (
                        <div className="card" key={productId}>
                            <img src={product.image} alt="" />
                            <h3>{product.name}</h3>
                            <div className="optionsProducts">
                                <button
                                    className="cardBtnEdit"
                                    onClick={() => {
                                        handleEditProduct(productId);
                                    }}
                                >
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                                <button
                                    className="cardBtnDelete"
                                    onClick={() => setModalIsOpen(true)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                            <OrderModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
                                <AlertDelete 
                                singleProduct={product}/>
                            </OrderModal>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
