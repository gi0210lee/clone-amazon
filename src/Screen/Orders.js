import React, { useEffect, useState } from 'react'
import './Orders.css'
import { useStateValue } from './../Provider/StateProvider';
import { collection, doc, getDoc, getDocs, orderBy, query } from '@firebase/firestore';
import { db } from '../firebase';
import Order from './Order';

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([])

    const getData = async () => {
        const docRef = collection(db, "users", user?.uid, "orders");

        const q = query(docRef, orderBy('created', 'desc'));
        const querySnapshot = await getDocs(q);

        setOrders(querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        })))
    }

    useEffect(() => {
        if (user) {
            getData();
        } else {
            setOrders([])
        }
    }, [user])


    console.log('orders', orders)
    return (
        <div className='orders'>
            <h1>주문내역</h1>
            <div className="orders_order">
                {orders?.map((order) => (
                    <Order key={order.id} order={order} />
                ))}
            </div>
        </div >
    )
}

export default Orders