import React from "react";
import { useState } from "react";

import CardsAllProducts from "./CardsAllProducts";
import Header from "../Header/header";
import NavBarProducts from "./NavBar-Products";
import OrderModal from '../UI/Modal';
import SingleProduct from "../SingleProduct/SingleProduct";


export default function Products() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [modalIsOpen2, setModalIsOpen2] = useState(false);
    // const [selectedProduct, setselectedProduct] = useState({});

    return (
        <>
            <Header />
            <NavBarProducts
                setModalIsOpen={setModalIsOpen} />
            <CardsAllProducts
                // getProduct={selectedProduct}
                setModalIsOpen={setModalIsOpen}
                // setModalIsOpen2={setModalIsOpen2} 
                />

            <OrderModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
                <SingleProduct />
            </OrderModal>
            {/* <OrderModal modalIsOpen={modalIsOpen2} setModalIsOpen={setModalIsOpen2}>
                <AlertDelete
                    singleProduct={selectedProduct}
                    setModalIsOpen={setModalIsOpen} />
            </OrderModal> */}
        </>
    )

}