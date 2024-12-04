
import './Login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from './CartContext';
function Confirm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {price,updatePrice,updatequantity} =useCart();
  const [isLogin,setIsLogin]=useState(true);

  

  useEffect(() => {
    if(message){
    toast(message, {
      autoClose: 5000, // Time in milliseconds
      pauseOnHover: true,
      closeOnClick: true,
    });
  }
  }, [message]);
  useEffect(()=>{
    let temp=localStorage.getItem('user');
    if(temp)
    {
      setIsLogin(true);
    }
    if(!(isLogin))
    {
      setMessage('login first to complete payment');
    }
  },[]);
  const Handler=()=>{
    let temp=localStorage.getItem('user');
    if(temp)
    {
      setIsLogin(true);
    }
    if(!(isLogin))
    {
      setMessage('login first to complete payment');
      return;
    }
    setMessage(' payment-successful,shop more in shop'); 
    updatePrice(0);
    updatequantity(Array(16).fill(0));
    setTimeout(()=>{navigate('/shop'); },5000); 


  }
  
  return (
    <div className="Login" >
      <div className="main2">
        <div className="main">
          <button className='back' style={{color:'black'}} onClick={(event) => { navigate('/shop') }}> &larr;</button>
          <div style={{marginBottom:'50px'}}>confirm payment</div>
          <div className="text1">
            <div>total bill is {"\u20B9"}{price} </div>
            {isLogin &&(<button className="button-navig" onClick={(event) => { Handler();
          }}>Confirm payment</button>)}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


    </div>
  );
}

export default Confirm;
