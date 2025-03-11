import React, { useState, useEffect } from 'react';
import axios from 'axios';

import OrderModal from '../UI/Modal';
import SingleProduct from '../SingleProduct/SingleProduct';
import AlertDelete from '../AlertDelete/alertDelete';
import '../cardsProd/cardsProd.css';
import './products.css';

export default function CardsAllProducts({ setModalIsOpen }) {
    const [allProducts, setAllProducts] = useState([]);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Función para obtener los productos
    const getAllProducts = async () => {
        const token = localStorage.getItem('sessionToken');
        try {
            const res = await axios.get('http://localhost:8080/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setAllProducts(res.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    // Función para eliminar un producto
    const handleDeleteProduct = async (productId) => {
        const token = localStorage.getItem('sessionToken');
        try {
            await axios.delete(`http://localhost:8080/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Refrescar la lista de productos después de eliminar
            getAllProducts();

            // Cerrar el modal después de eliminar
            setDeleteModalIsOpen(false);
            setSelectedProduct(null);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    return (
        <>
            <div className="containerMenu">
                {allProducts.map((product) => (
                    <div className="card" key={product.id}>
                        <img src={product.image} alt="" />
                        <h3>{product.name}</h3>
                        <div className="optionsProducts">
                            <button
                                className="cardBtnEdit"
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setEditModalIsOpen(true);
                                }}
                            >
                                <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button
                                className="cardBtnDelete"
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setDeleteModalIsOpen(true);
                                }}
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal para editar producto */}
            <OrderModal modalIsOpen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen}>
                {selectedProduct && (
                    <SingleProduct
                        product={selectedProduct}
                        closeModal={() => setEditModalIsOpen(false)}
                        refreshProducts={getAllProducts} 
                    />
                )}
            </OrderModal>

            {/* Modal para confirmar eliminación */}
            <OrderModal modalIsOpen={deleteModalIsOpen} setModalIsOpen={setDeleteModalIsOpen}>
                {selectedProduct && (
                    <AlertDelete
                        singleProduct={selectedProduct}
                        confirmDelete={() => handleDeleteProduct(selectedProduct.id)}
                        closeModal={() => setDeleteModalIsOpen(false)}
                    />
                )}
            </OrderModal>
        </>
    );
}
