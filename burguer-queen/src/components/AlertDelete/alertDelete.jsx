import React from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './alertDelete.css'

export default function AlertDelete({ singleProduct }) {

    function toDelete() {

        toast.success('Deleted product', {
            position: "bottom-center",
            autoClose: 2000,
            theme: "dark",
        })

        const token = localStorage.getItem('sessionToken');
        let id = singleProduct.id

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        axios
            .delete(`http://localhost:8080/products/${id}`, { headers })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <div className="alertMessage">
                <h2>Do you want to delete {singleProduct.name}?</h2>
                <button onClick={() => toDelete(singleProduct)}>OK</button>
                <ToastContainer />
            </div>
        </>
    );
}