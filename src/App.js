import './App.css';
import Header from './Screen/Header';
import Home from './Screen/Home';
import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './Screen/Checkout';
import Login from './Screen/Login';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStateValue } from './Provider/StateProvider';
import Payment from './Screen/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Screen/Orders';

const promise = loadStripe(
  "pk_test_51LxM48Kkb267dxHgljFrjJDou1vT3x01VPGPKDYJFoUY8OsTIlPULbdkfOnT0fbkLFzanS1nqn8a0T77oPFtMIvN00jROHx3Aj"
)

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        dispatch({
          type: 'SET_USER',
          user: user,
        })
      } else {
        dispatch({ type: 'SET_USER', user: null });
      }
    })
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<div><Header /><Orders /></div>} />
          <Route path="/" element={<div><Header /><Home /></div>} />
          <Route path='/checkout' element={<div><Header /><Checkout /></div>} />
          <Route path='/payment' element={<div><Header /><Elements stripe={promise}><Payment /></Elements></div>} />
        </Routes>
      </div >
    </BrowserRouter >
  );
}

export default App;
