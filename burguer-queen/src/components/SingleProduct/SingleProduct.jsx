import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './singleProduct.css';

export default function SingleProduct({ product, closeModal, refreshProducts }) {
    // Estado inicial basado en si es edición o nuevo producto
    const [form, setForm] = useState({
        name: "",
        price: "",
        image: "",
        type: "Breakfast",
    });

    // Si hay un producto (modo edición), llenar el formulario
    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                price: product.price,
                image: product.image,
                type: product.type,
            });
        }
    }, [product]);

    // Manejar cambios en los inputs
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Manejar envío del formulario (Agregar o Editar)
    function submitProduct(e) {
        e.preventDefault();
        const token = localStorage.getItem('sessionToken');
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

        // Si hay un producto, es edición (PUT)
        if (product) {
            axios
                .put(`https://burger-queen-mock-zjbl.onrender.com/products/${product.id}`, form, { headers })
                .then(() => {
                    //toast.success('Product updated successfully!', { position: "bottom-center", autoClose: 2000, theme: "dark" });
                    refreshProducts(); // Refrescar lista de productos
                    closeModal(); // Cerrar modal
                })
                .catch((error) => console.error(error));
        } else {
            // Si no hay un producto, es nuevo (POST)
            const newProduct = { ...form, dateEntry: moment().format('LLL') };
            axios
                .post('https://burger-queen-mock-zjbl.onrender.com/products', newProduct, { headers })
                .then(() => {
                    //toast.success('Product added successfully!', { position: "bottom-center", autoClose: 2000, theme: "dark" });
                    refreshProducts(); // Refrescar lista de productos
                    closeModal(); // Cerrar modal
                })
                .catch((error) => console.error(error));
        }
    }

    return (
        <div className="FormNewProduct">
            <h1 className="titleForm">{product ? "Edit Product" : "New Product"}</h1>
            <form onSubmit={submitProduct}>
                <label className="entriesForm">
                    Product name: <input type="text" name="name" value={form.name} onChange={handleChange} />
                </label>

                <label className="entriesForm">
                    Price: <input type="number" name="price" value={form.price} onChange={handleChange} />
                </label>

                <label className="entriesForm">
                    Image: <input type="text" name="image" value={form.image} onChange={handleChange} />
                </label>

                <label className="entriesForm">
                    Type:
                    <select className="selectForm" name="type" value={form.type} onChange={handleChange}>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                    </select>
                </label>

                <div className="BtnNewProduct">
                    <button type="submit">{product ? "Update" : "Save"}</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
