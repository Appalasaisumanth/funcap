import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App';
import Login from './Login';
import Register from './Register';
import './index.css';
import Shop from './shop';
import Payment from './Payment';
import Confirm from './Confirm';
import Cart from './Cart';
import { CartProvider } from './CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
    <CartProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </CartProvider>
    </Router>
  </React.StrictMode>
);
