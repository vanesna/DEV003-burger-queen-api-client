import React from 'react';
import Header from '../Header/header';
import NavBarKitchen from './NavBar-kitchen';
import OrderList from './OrdersList';

export default function Kitchen() {


    return (
        <div>
            <Header />
            <h1>Orders</h1>
            <NavBarKitchen />
            <OrderList />

        </div>
    );
}