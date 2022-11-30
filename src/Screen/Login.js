import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // 로그인
    const signIn = (e) => {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // console.log(user);
                if (userCredential) {
                    navigate('/');
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage)
            });
    }

    // 회원가입
    const register = (e) => {
        e.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // console.log(user);
                if (userCredential) {
                    navigate('/');
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage)
            });

    }

    return (
        <div className='login'>
            <Link to='/'>
                <img className='login_logo'
                    src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcd2MQ5%2Fbtqx0q65v5Y%2FmKwQKWKh0HNtslQkgsktE0%2Fimg.jpg'
                    alt=''
                />
            </Link>

            <div className='login_container'>
                <h1>로그인</h1>
                <form>
                    <h5>이메일</h5>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="text" />
                    <h5>비밀번호</h5>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password" />

                    <button
                        className='login_signInButton'
                        onClick={signIn}
                    >
                        로그인하기
                    </button>
                </form>
                <p>계속하면 아마존의 이용 약관 및 개인정보 취급방침에 동의하는 것 입니다.</p>
                <p>도움이 필요하십니까?</p>

                <p>Amazon 이(가) 처음이십니까?</p>

                <button
                    className='login_registerButton'
                    onClick={register}
                >
                    내 Amazon 계정 생성
                </button>
            </div>
        </div>
    )
}

export default Login