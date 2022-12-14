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
                    <h1>??????????????? ????????????  ({basket?.length} ?????? ??????????????? ???????????????.)</h1>
                </Link>


                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>?????? ?????? ???</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}??? ??????</p>
                        <p>?????????</p>
                        <p>??????</p>
                    </div>
                </div>
            </div>



            <div className='payment_section' >
                <div className='payment_title'>
                    <h3>?????? ??????</h3>
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
                    <h3>??????</h3>
                </div>
                <div className='payment_details'>
                    <form onSubmit={handleSubmit}>

                        <CardElement onChange={handleChange} />
                        <div className='payment_priceContainer'>
                            <CurrencyFormat renderText={(value) => (
                                <>
                                    <p>
                                        ?????? ( {basket.length} items) : <strong>{value} ??? </strong>
                                    </p>
                                    <small className='subtotal_gift'>
                                        <input type="checkbox" />?????????????????????
                                    </small>
                                </>)}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"???"}
                            />

                            <button
                                disabled={processing || disable || succeded}
                            >
                                <span>
                                    {processing ? <p>??????????????????.</p> : `????????????`}
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