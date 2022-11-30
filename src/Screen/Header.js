import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../Provider/StateProvider';
import { getAuth, signOut } from "firebase/auth";

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            const auth = getAuth();
            signOut(auth).then(() => {
                // Sign-out successful.                
            }).catch((error) => {
                // An error happened.
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage)
            });
        } else {

        }
    }
    return (
        <div className='header'>
            <Link to='/'>
                <img
                    className='header_logo' src='https://i0.wp.com/www.dafontfree.co/wp-content/uploads/2021/11/Amazon-Logo-Font-1-scaled.jpg?resize=2560%2C1578&ssl=1'
                    alt=''
                />
            </Link>
            <div className='header_search'>
                <input
                    className='header_searchInput' type='text' />
                <SearchIcon className='header_searchIcon' />
            </div>

            <div className='header_nav'>
                <div className='header_option'>
                    <span className='header_optionLineOne'>
                        {user ? user.email : `안녕하세요`}
                    </span>
                    <Link to={!user && '/login'} className='homelogin'>
                        <span
                            className='header_optionLineTwo'
                            onClick={handleAuthentication}>
                            {user ? `로그아웃` : `로그인`}
                        </span>
                    </Link>
                </div>
                <div className='header_option'>
                    <span className='header_optionLineOne'>반품</span>
                    <Link to='/orders' className='orderlist'>
                        <span className='header_optionLineTwo'>주문내역</span>
                    </Link>
                </div>
                <div className='header_option'>
                    <span className='header_optionLineOne'>try</span>
                    <span className='header_optionLineTwo'>Prime</span>
                </div>

                <Link to='/checkout' >
                    <div className='header_optionBasket'>
                        <ShoppingBasketIcon />
                        <span className='header_optionLineTwoHeader_basketCount'>{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default Header