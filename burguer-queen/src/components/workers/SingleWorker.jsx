import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../SingleProduct/singleProduct.css';

export default function SingleWorker({ worker, closeModal, refreshWorkers }) {
    // Estado inicial basado en si es edición o nuevo producto
    const [form, setForm] = useState({
        email: "",
        password: "",
        image: "",
        role: "Waiter",
    });

    // Si hay un producto (modo edición), llenar el formulario
    useEffect(() => {
        if (worker) {
            setForm({
                email: worker.email,
                password: worker.password,
                image: worker.image,
                role: worker.role,
            });
        }
    }, [worker]);

    // Manejar cambios en los inputs
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Manejar envío del formulario (Agregar o Editar)
    function submitWorker(e) {
        e.preventDefault();
        const token = localStorage.getItem('sessionToken');
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

        // Si hay un producto, es edición (PUT)
        if (worker) {
            axios
                .put(`http://localhost:8080/users/${worker.id}`, form, { headers })
                .then(() => {
                    //toast.success('Product updated successfully!', { position: "bottom-center", autoClose: 2000, theme: "dark" });
                    refreshWorkers(); // Refrescar lista de productos
                    closeModal(); // Cerrar modal
                })
                .catch((error) => console.error(error));
        } else {
            // Si no hay un producto, es nuevo (POST)
            const newWorker = { ...form, dateEntry: moment().format('LLL') };
            axios
                .post('http://localhost:8080/users', newWorker, { headers })
                .then(() => {
                    //toast.success('Product added successfully!', { position: "bottom-center", autoClose: 2000, theme: "dark" });
                    refreshWorkers(); // Refrescar lista de productos
                    closeModal(); // Cerrar modal
                })
                .catch((error) => console.error(error));
        }
    }

    return (
        <div className="FormNewProduct">
            <h1 className="titleForm">{worker ? "Edit User" : "New User"}</h1>
            <form onSubmit={submitWorker}>
                <label className="entriesForm">
                    Email: <input type="text" name="email" value={form.email} onChange={handleChange} />
                </label>

                <label className="entriesForm">
                    Password: <input type="text" name="password" value={form.password} onChange={handleChange} />
                </label>

                <label className="entriesForm">
                    Image: <input type="text" name="image" value={form.image} onChange={handleChange} />
                </label>

                <label className="entriesForm">
                    Role:
                    <select className="selectForm" name="role" value={form.role} onChange={handleChange}>
                        <option value="Waiter">Waiter</option>
                        <option value="Chef">Chef</option>
                        <option value="Admin">Admin</option>
                    </select>
                </label>

                <div className="BtnNewProduct">
                    <button type="submit">{worker ? "Update" : "Save"}</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
