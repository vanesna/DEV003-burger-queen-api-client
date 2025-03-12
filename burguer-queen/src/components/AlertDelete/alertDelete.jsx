import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './alertDelete.css'

export default function AlertDelete({ item, confirmDelete }) {

    console.log(item)
   
    return (
        <>
            <div className="alertMessage">
                <h2>Do you want to delete {item?.name || item?.email}   ?</h2>
                <button onClick={confirmDelete}>OK</button>
                <ToastContainer />
            </div>
        </>
    );
}