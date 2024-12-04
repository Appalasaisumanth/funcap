
import './Login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from './CartContext';
function Cart() {
  const navigate = useNavigate();
 const [message, setMessage] = useState("");
 const [isEmpty,SetIsempty]=useState(true);
 // eslint-disable-next-line no-unused-vars
 const {quantity,updatequantity,products,price,updatePrice}=useCart();
 useEffect(()=>{

  for(var i=0;i<16;i++)
  {
    if(quantity[i]>0)
    {
      SetIsempty(false);
      break;
    }
  
  }
  if(isEmpty)
    {
      setMessage('cart is empty,go back and buy something');
    }
 });




  useEffect(() => {
    if(message){
    toast(message, {
      autoClose: 5000, // Time in milliseconds
      pauseOnHover: true,
      closeOnClick: true,
    });
  }
  }, [message]);

  const decrementQuantity = (index) => {
       
    if (quantity[index] > 0) {
      
      const newQuantity = [...quantity];
      
      newQuantity[index] -= 1;
  
    
      updatequantity(newQuantity);
     
    }
  };
  const IncrementQuantity = (index) => {
   

      
      const newQuantity = [...quantity];
      
      newQuantity[index] += 1;
     
    
      updatequantity(newQuantity);
    
    
  };
useEffect(()=>{
var temp=0;

for(var i=0;i<16;i++)
{
    if(quantity[i]>0)
    {
        temp+=(products[i].price)*quantity[i];
        

    }
}
updatePrice(temp);


},[quantity,products,updatePrice]);
  
  return (
    <div className="Login" style={{background:'none'}} >
      <div className="main2" >
        <div className="main" style={{width:'min(500px,80vw)'}}>
          <button className='back' style={{color:'black'}} onClick={(event) => { navigate('/shop') }}> &larr;</button>
          <div style={{marginBottom:'50px'}}>cart</div>
          {/* <div className="text1">
            <div>total bill is {"\u20B9"}{1000} </div>
            <button className="button-navig" onClick={(event) => { setMessage(' payment-successful,shop more in shop'); setTimeout(()=>{navigate('/shop');},5000); }}>Confirm payment</button>
          </div> */}
          {isEmpty && <div> cart is empty </div>}
              
          {(products.length > 0  ) ? (products.map((back, index) => (quantity[index]>0 && (<div key={index} className='card-outline' id={"card-outline" + String(index)} style={{display:'flex',flexWrap:'nowrap'}}>

                        <div >
                            <img  height={50} width={50}src={back.image_url} alt=" product" />
                        </div>
                        <div style={{ textAlign: 'center',width:'200px' }}>{back.name}</div>
                        <div>{"\u20B9"}{back.price}</div>
                        <div style={{ display: 'flex'  }}>
                            <div className='buttons1' style={{ marginLeft: '0px', fontSize: '5px' }}>
                                <button onClick={()=>{  IncrementQuantity(index)}}>+</button>
                                <button >{quantity[index]}</button>
                                <button onClick={()=>{ decrementQuantity(index) }}>-</button>
                            </div>
                        </div>
                    </div>)))) :  (<span></span>)}
          <div ><button type='button' className="final-button" onClick={(event)=>{navigate('/confirm')}}>
                    Buy now {"\u20B9"}{price}
                </button></div>
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

export default Cart;
