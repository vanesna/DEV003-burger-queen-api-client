import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './singleProduct.css'

export default function SingleProduct() {

    const [form, setForm] = useState({});
    console.log('form: ', form);

    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;


    function submitProduct(e) {
        e.preventDefault();

        toast.success('Added product', {
            position: "bottom-center",
            autoClose: 2000,
            theme: "dark",
        })

        let d = new Date();
        let formatteddatestr = moment(d).format('LLL');
        const token = localStorage.getItem('sessionToken');

        const form = e.target;

        const product = {
            name: form.name.value,
            price: parseInt(form.price.value),
            image: form.image.value,
            type: form.type.value,
            dateEntry: formatteddatestr,
        };
        // console.log(product);

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        axios
            .post('http://localhost:8080/products', product, { headers })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <div className="FormNewProduct">
                <h1 className="titleForm">New product</h1>
                <form onSubmit={submitProduct}>

                    <label className="entriesForm"> Product name: {tab} <input type="text" name="name" /></label>

                    <label className="entriesForm"> Price: {tab} <input type="number" name="price" /></label>

                    <label className="entriesForm"> Image: {tab} <input type="text" name="image" /></label>

                    <label className="entriesForm">
                        Type: {tab}
                        <select className="selectForm" name="type">
                            <option className="selectForm" value="Breakfast">Breakfast</option>
                            <option className="selectForm" value="Lunch">Lunch</option>
                        </select>
                    </label>

                    <span className="error-text"></span>
                    <div className="BtnNewProduct">
                        <button type="submit">Save</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}
