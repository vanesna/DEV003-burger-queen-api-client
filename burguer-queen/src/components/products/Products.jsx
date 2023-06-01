import React from "react";
import { useState } from "react";

import CardsAllProducts from "./CardsAllProducts";
import Header from "../Header/header";
import NavBarProducts from "./NavBar-Products";
import OrderModal from '../UI/Modal';
import SingleProduct from "../SingleProduct/SingleProduct";

export default function Products() {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <Header />
            <NavBarProducts
                setModalIsOpen={setModalIsOpen} />
            <CardsAllProducts />
            <OrderModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
                <SingleProduct />
            </OrderModal>
        </>
    )

}