import React from 'react'
import './Order.css'
import CheckoutProduct from './CheckoutProduct';
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './../Provider/StateProvider';

function Order({ order }) {
    const [{ basket, user }, dispatch] = useStateValue();

    console.log('here order')
    return (
        <div className='order'>
            <h2>주문</h2>
            <p>{moment.unix(order.data.created).format()}</p>

            <p className="order_id">
                <small>{order.id}</small>
            </p>

            {order.data.basket?.map(item => (

                <CheckoutProduct
                    id={item.id}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    title={item.title}
                    hideButton
                />

            ))}

            <div>
                <CurrencyFormat
                    renderText={(value) => (
                        <h3 className="order_total"> 최종 주문 총액 : {value} 원 </h3>
                    )}
                    decimalScale={2}
                    value={order.data.amount / 100}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"￦"}
                />
            </div>
        </div >
    )
}

export default Order