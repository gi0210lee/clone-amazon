import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from './../Provider/StateProvider';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../Reducer/Reducer';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from '../axios';
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [disable, setDisable] = useState(true)
    const [processing, setProcessing] = useState('')
    const [succeded, setSucceded] = useState(false)
    const [clientSecret, setClientSecret] = useState(true)

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const getClientSecret = async () => {
            const res = await axios({
                method: 'post',
                url: '/payments/create?total=' + getBasketTotal(basket) * 100

                /* url: '/payments/create?total=' + getBasketTotal(basket) * 100 */
            });
            setClientSecret(res.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('total', getBasketTotal(basket));
    console.log("clientSecret", clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (result.error) {
            console.log('err', result.error.message);
        } else {
            const paymentIntent = result.paymentIntent;

            await setDoc(doc(db, "users", user?.uid, "orders", paymentIntent.id), {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            });


            setSucceded(true);
            setError(null);
            setProcessing('');

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders', { replace: true })
            // });
        }
    }

    const handleChange = (event) => {
        setDisable(event.empty)
        setError(event.error ? event.error.message : ``)
    }

    return (
        <div className='payment'>
            <div className='payment_container' >
                <Link to='/checkout' className='checkoutlink'>
                    <h1>장바구니로 돌아가기  ({basket?.length} 개의 상품목록이 존재합니다.)</h1>
                </Link>


                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>배달 받을 곳</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}의 주소</p>
                        <p>강원도</p>
                        <p>철원</p>
                    </div>
                </div>
            </div>



            <div className='payment_section' >
                <div className='payment_title'>
                    <h3>상품 목록</h3>
                </div>

                <div className='payment_items'>
                    <div className='payment_item'>
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
            </div>

            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>결재</h3>
                </div>
                <div className='payment_details'>
                    <form onSubmit={handleSubmit}>

                        <CardElement onChange={handleChange} />
                        <div className='payment_priceContainer'>
                            <CurrencyFormat renderText={(value) => (
                                <>
                                    <p>
                                        총액 ( {basket.length} items) : <strong>{value} 원 </strong>
                                    </p>
                                    <small className='subtotal_gift'>
                                        <input type="checkbox" />체크박스입니다
                                    </small>
                                </>)}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"￦"}
                            />

                            <button
                                disabled={processing || disable || succeded}
                            >
                                <span>
                                    {processing ? <p>결제중입니다.</p> : `결재하기`}
                                </span>
                            </button>
                        </div>

                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Payment