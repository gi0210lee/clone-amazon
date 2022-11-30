import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../Provider/StateProvider'
import { getBasketTotal } from '../Reducer/Reducer';
import './Subtotal.css'

function Subtotal() {
    const [{ basket }, dispatch] = useStateValue();
    const navigate = useNavigate();
    return (
        <div className='subtotal'>
            <CurrencyFormat
                value={getBasketTotal(basket)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'w'}
                renderText={value =>
                    <div>
                        <p>총액 ( {basket.length} items) : <strong> {value} 원</strong>
                        </p>
                        <small className='subtotal_gift'>
                            <input type='checkbox' /> 체크박스 입니다.
                        </small>
                    </div>}
                decimalScale={2}
            />
            <button onClick={() => { navigate('/payment') }}>결재하러 가기</button>
        </div>

    )
}

export default Subtotal