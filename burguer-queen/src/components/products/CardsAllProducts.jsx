import React, { useState } from 'react';
import axios from 'axios';

import OrderModal from '../UI/Modal';
import SingleProduct from '../SingleProduct/SingleProduct';
import AlertDelete from '../AlertDelete/alertDelete';
import '../cardsProd/cardsProd.css';
import './products.css';

export default function CardsAllProducts({ setModalIsOpen, allProducts, getAllProducts }) {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // ✅ Función para eliminar producto
    const handleDeleteProduct = async (productId) => {
        const token = localStorage.getItem('sessionToken');
        try {
            await axios.delete(`http://localhost:8080/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            getAllProducts(); // ✅ Refrescar lista de productos
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
                        <img src={product.image} alt={product.name} />
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

            {/* ✅ Modal para editar */}
            <OrderModal modalIsOpen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen}>
                {selectedProduct && (
                    <SingleProduct
                        product={selectedProduct}
                        closeModal={() => setEditModalIsOpen(false)}
                        refreshProducts={getAllProducts} 
                    />
                )}
            </OrderModal>

            {/* ✅ Modal para eliminar */}
            <OrderModal modalIsOpen={deleteModalIsOpen} setModalIsOpen={setDeleteModalIsOpen}>
                {selectedProduct && (
                    <AlertDelete
                        item={selectedProduct}
                        confirmDelete={() => handleDeleteProduct(selectedProduct.id)}
                        closeModal={() => setDeleteModalIsOpen(false)}
                    />
                )}
            </OrderModal>
        </>
    );
}
