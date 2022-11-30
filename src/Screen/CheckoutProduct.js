import React from 'react'
import { useStateValue } from '../Provider/StateProvider'
import './CheckoutProduct.css'

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
        return (
            dispatch({
                type: 'REMOVE_FROM_BASKET',
                id,

            })
        )
    };

    return (
        <div className='checkoutProduct'>
            <img
                className='checkoutProduct_image'
                src={image}
                alt=''
            />
            <div className='checkoutProduct_info'>
                <p className='checkoutProduct_title'>{title}</p>
                <p className='checkoutProduct_price'>
                    <small>￦</small>
                    <strong>{price}</strong>
                    <small>원</small>
                </p>

                <div className='checkoutProduct_rating' >
                    {
                        Array(rating)
                            .fill()
                            .map((_, i) => (
                                <p key={i}>★</p>
                            ))
                    }
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket}>장바구니에서 제거하기</button>)
                }
            </div>

        </div>
    )
}

export default CheckoutProduct