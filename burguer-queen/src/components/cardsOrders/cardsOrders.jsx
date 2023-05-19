import React from 'react';
import '../kitchen/kitchen.css'
import './cardsOrders.css'
import OptionsKitchen from '../kitchen/optionsKitchen';
import { useLocation } from "react-router-dom";

export default function CardsOrders({ orders }) {

    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

    let location = useLocation();
    // console.log(location.pathname)

    return (
        <>
            <div>
                <main className='containerOrders'>
                    {orders.map((order) => {
                        return (
                            <div className='cardOrder' key={order.id}>
                                <h3>{order.client}</h3>
                                {order.products.map((products) => {
                                    return (
                                        <div key={products.id}>
                                            <h4 className='productsOrder'>{products.qty}{tab}{products.product.name}</h4>
                                        </div>
                                    )
                                })}                            
                                <OptionsKitchen
                                    location={location.pathname}
                                    status={order.status}
                                    singleOrder={order}
                                />
                            </div>
                        )
                    }

                    )}

                </main >
            </div>
        </>
    );
}