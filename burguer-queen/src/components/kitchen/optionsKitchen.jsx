import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Checkbox } from '../checkbox/checkbox';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OptionsKitchen({ location, singleOrder, status, handleToDelivered }) {



    async function toDelivering(order) {

        const token = localStorage.getItem('sessionToken');
        let id = order.id
        let d = new Date();
        let formatteddatestr = moment(d).format('hh:mm a');

        order.status = 'delivering';
        order.dateProcessed = formatteddatestr


        try {
            await axios.put(`https://burger-queen-mock-zjbl.onrender.com/orders/${id}`, order, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            handleToDelivered();
        } catch (error) {
            console.error("Error updating order:", error);
        }
    }

    if (location === '/kitchen' && status === 'pending') {
        return (
            <>
                <p>Entry: {singleOrder.dataEntry}</p>
                <button className='buttonOrders' onClick={() => toDelivering(singleOrder)}>Deliver</button>
                <ToastContainer />
            </>
        )

    }
    else if (location === '/kitchen' && status === 'delivering') {

        let startTime = moment(singleOrder.dataEntry, 'hh:mm a');
        let endTime = moment(singleOrder.dateProcessed, 'hh:mm a');
        let totalTime = endTime.diff(startTime, 'minutes');

        return (
            <>
                <p>Entry: {singleOrder.dataEntry}</p>
                <p>Departure: {singleOrder.dateProcessed}</p>
                <p className='totalTime'>Total time: {totalTime} minutes</p>
            </>

        )
    }
    else if (location === '/orders' && status === 'delivering') {

        return (
            <>
                <div className='checkbox'>
                    <Checkbox onChange={() => handleToDelivered(singleOrder)} />
                    <ToastContainer />
                </div>
            </>

        )
    }

    else if (location === '/orders' && status === 'delivered') {

        return (
            <>
                <div className='orderChecked'>
                    <i className="bi bi-check2-square"> Delivered</i>
                </div>
            </>

        )
    }
}