import React, { useState, useEffect } from "react";
import axios from "axios";

import CardsAllProducts from "./CardsAllProducts";
import Header from "../Header/header";
import NavBarProducts from "./NavBar-Products";
import OrderModal from '../UI/Modal';
import SingleProduct from "../SingleProduct/SingleProduct";


export default function Products() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [allProducts, setAllProducts] = useState([]); // Estado para almacenar productos

    // Función para obtener productos
    const getAllProducts = async () => {
        const token = localStorage.getItem('sessionToken');
        try {
            const res = await axios.get('https://burger-queen-mock-zjbl.onrender.com/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setAllProducts(res.data); // Actualiza la lista de productos
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    // Cargar productos al montar el componente
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <>
            <Header />
            <NavBarProducts setModalIsOpen={setModalIsOpen} />
            <CardsAllProducts setModalIsOpen={setModalIsOpen} allProducts={allProducts} getAllProducts={getAllProducts} />

            {/* Modal para agregar productos */}
            <OrderModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
                <SingleProduct closeModal={() => setModalIsOpen(false)} refreshProducts={getAllProducts} />
            </OrderModal>
        </>
    )

}