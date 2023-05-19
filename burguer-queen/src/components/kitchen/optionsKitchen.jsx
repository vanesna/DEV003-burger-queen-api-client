import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Checkbox } from '../checkbox/checkbox';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OptionsKitchen({ location, singleOrder, status }) {


    
    async function toDelivering(order) {

        const token = localStorage.getItem('sessionToken');

        let id = order.id

        let d = new Date();
        let formatteddatestr = moment(d).format('hh:mm a');

        order.status = 'delivering';
        order.dateProcessed = formatteddatestr


        await axios.put(`http://localhost:8080/orders/${id}`, order, {

            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    }

    async function toDelivered(order) {

        console.log('Entregado')
        toast.success('The order was sent', {
            position: "bottom-center",
            autoClose: 2000
        })

        const token = localStorage.getItem('sessionToken');

        let id = order.id

        order.status = 'delivered';

        await axios.put(`http://localhost:8080/orders/${id}`, order, {

            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    }

    if (location === '/kitchen' && status === 'pending') {
        return (
            <>
                <p>Entry: {singleOrder.dataEntry}</p>
                <button onClick={() => toDelivering(singleOrder)}>Deliver</button>
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
                <Checkbox onChange={() => toDelivered(singleOrder)} />
                <ToastContainer />
            </>

        )
    }

    else if (location === '/orders' && status === 'delivered') {

        return (
            <>
                <Checkbox onChange={() => toDelivered(singleOrder)} />
                <ToastContainer />
            </>

        )
    }
}