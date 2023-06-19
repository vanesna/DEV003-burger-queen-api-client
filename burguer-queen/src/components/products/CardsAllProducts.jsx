import React, { useState, useEffect } from 'react';
import axios from 'axios';

import OrderModal from '../UI/Modal';
// import SingleProduct from '../SingleProduct/SingleProduct';
import AlertDelete from '../AlertDelete/alertDelete';
import '../cardsProd/cardsProd.css';
import './products.css'

export default function CardsAllProducts({ setModalIsOpen }) {

    const [allProducts, setAllProducts] = useState([]);
    const [selectedProduct, setselectedProduct] = useState({});

    // const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);

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
                                    onClick={() => setModalIsOpen(true)}
                                >
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                                <button
                                    className="cardBtnDelete"
                                    onClick={() => setModalIsOpen2(true)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>

                            <OrderModal modalIsOpen={modalIsOpen2} setModalIsOpen={setModalIsOpen2}>
                                <AlertDelete
                                    singleProduct={product} />
                            </OrderModal>

                        </div>
                    );

                })}
            </div>
        </>
    );
}
