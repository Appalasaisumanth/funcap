
import './Login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './assests/Loader';
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading,setIsloading]=useState(false);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if(message){
    toast(message, {
      autoClose: 5000, // Time in milliseconds
      pauseOnHover: true,
      closeOnClick: true,
    });
  }
  }, [message]);
  const submitHandler = async (event) => {
    event.preventDefault();
    setIsloading(true);
    //console.log("Submitting", formData);
    if(formData.password && formData.username){
      const formDatatoSend ={username: formData.username,password: formData.password};
          const response = await fetch('https://fulltoss-backend-9igo.onrender.com/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDatatoSend),
  });
  
   if(response.ok)
   {//console.log(response.json);
    const temporary = await response.json();
    setIsloading(false); // Await the json() call
    setMessage(temporary.message);
    //setTeam(temporary.result)
    setMessage('your team is '+temporary.result+' u can update them later');
    localStorage.setItem("user", temporary.result+ "+" + formData.username);
   setTimeout(()=>{navigate('/shop');},5000); 
    
}
   
   else
   {
    const temporary = await response.json();
    setMessage(temporary.message);
    setIsloading(false);
    //console.log(temporary.error);
    
    
   }}
   else{
    setMessage("input all feilds");
   }
  };
  return (
    <div className="Login" >
      <div className="main2">
        <div className="main">
          <button className='back' style={{color:'black'}} onClick={(event) => { navigate('/') }}> &larr;</button>
          <div style={{marginBottom:'50px'}}>welcome back</div>
          <div className="text1">
            <div>New to the store </div>
            <button className="button-navig" onClick={(event) => { navigate('/register') }}>Register</button>
          </div>
          <div class="g-input">
            <input type="text" id="user-name2" name="username"   value={formData.username}
                onChange={handleChange} placeholder=" " />
            <label for="user-name2">Username</label>
          </div>
          <div class="g-input">
            <input type="password" id="password2" name="password"    value={formData.password}   onChange={handleChange} placeholder=" " />
            <label for="password2">Password</label>
          </div>
          <div style={{ marginBottom:"10px"}}>
            <a href="/" style={{color:"black",marginLeft:"100px"}}>forgot password</a>
          </div>
          <button className="button-navig" onClick={submitHandler} >Submit</button>
          {isLoading ? (
                <div
                    style={{
                        width: "100px",
                        margin: "auto",
                    }}
                >
                    <Loader />
                </div>):( <ToastContainer
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
      />)}
        </div>
      </div>
     


    </div>
  );
}

export default Login;
