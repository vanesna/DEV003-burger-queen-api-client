import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../SingleProduct/singleProduct.css';

export default function SingleWorker({ worker, closeModal, refreshWorkers }) {
    const [form, setForm] = useState({
        email: worker?.email || "",
        password: "",  
        image: worker?.image || "",
        role: worker?.role || "Waiter",
    });

    useEffect(() => {
        if (worker) {
            setForm(prevForm => ({
                ...prevForm,
                password: worker.password, 
            }));
        }
    }, [worker]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function submitWorker(e) {
        e.preventDefault();
        const token = localStorage.getItem('sessionToken');
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

        let updatedWorker = { ...form };

        if (!form.password) {
            updatedWorker.password = worker?.password;
        }

        if (worker) {
            axios
                .put(`http://localhost:8080/users/${worker.id}`, updatedWorker, { headers })
                .then(() => {
                    refreshWorkers();
                    closeModal();
                })
                .catch((error) => console.error(error));
        } else {
            updatedWorker.dateEntry = moment().format('LLL');
            axios
                .post('http://localhost:8080/users', updatedWorker, { headers })
                .then(() => {
                    refreshWorkers();
                    closeModal();
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
                    Password: <input type="password" name="password" value={form.password} onChange={handleChange} required />
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
