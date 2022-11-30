import React from 'react'
import { useStateValue } from '../Provider/StateProvider';
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'

function Checkout() {
    const [{ basket, user }] = useStateValue();
    return (
        <div className='checkout'>
            <div className='checkout_left'>
                <img className='checkout_ad' src={`https://picsum.photos/id/${Math.floor(Math.random()) * 101}/600/100`} alt='' />

                <div>
                    <h2 className='checkout_title'>
                        {user?.email}의 장바구니
                    </h2>

                    {/* 장바구니 아이템 */}
                    {basket.map((item, i) =>
                        <div key={i}>
                            <CheckoutProduct
                                id={item.id}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                title={item.title}
                            />
                        </div>
                    )}
                </div>

            </div>

            <div className='checkout_right'>
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout