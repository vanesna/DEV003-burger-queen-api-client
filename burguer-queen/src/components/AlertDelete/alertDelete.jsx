import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './alertDelete.css'

export default function AlertDelete({ singleProduct, confirmDelete }) {

    console.log(singleProduct)
   
    return (
        <>
            <div className="alertMessage">
                <h2>Do you want to delete {singleProduct.name}?</h2>
                <button onClick={confirmDelete}>OK</button>
                <ToastContainer />
            </div>
        </>
    );
}