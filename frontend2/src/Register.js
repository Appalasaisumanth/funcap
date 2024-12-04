
import './Login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './assests/Loader';
function checkPass(password) {
  const Capital = "QWERTYUIOPLKJHGFDSAZXCVBNM";
  const Small = "qwertyuioplkjhgfdsazxcvbnm";
  const numbers = "0123456789";
  const special = "@#$&";

  const hasCapital = Capital.split('').some(char => password.includes(char));
  const hasSmall = Small.split('').some(char => password.includes(char));
  const hasNumber = numbers.split('').some(char => password.includes(char));
  const hasSpecial = special.split('').some(char => password.includes(char));

  return password.length >= 8 && hasCapital && hasSmall && hasNumber && hasSpecial;
}
function Register() {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "",email:"",repass:''});

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
   
    //console.log("Submitting", formData);
    if(formData.password && formData.username && formData.email && formData.repass ){
      if(formData.repass!==formData.password)
      {
        setMessage("passwords won't match");
        return;
      }
      if(!(formData.email.includes("@") && formData.email.includes("."))) {
        setMessage("enter vaild email");
        return;
      }
      if(!(checkPass(formData.password)))
      {
        setMessage("password should have more strength ");
        return;
      }
      setIsloading(true);
      const formDatatoSend ={username: formData.username,password: formData.password,email:formData.email};
          const response = await fetch('https://fulltoss-backend-9igo.onrender.com/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDatatoSend),
  });
  
   if(response.ok)
   {//console.log(response.json);
    const temporary = await response.json(); // Await the json() call
    setMessage('successful-register');
    setIsloading(false);
    setMessage(temporary.message);
   // setTeam(temporary.result)
    localStorage.setItem("user", temporary.result+ "+" + formData.username);
    setMessage('u are assigned'+temporary.result+' u can update ur team  later');
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
    <div className="Login" style={{ backgroundImage: "url('/part2.jpg')", width: "100vw", height: "100vh" }}>
       {isLoading ? (
                <div
                    style={{
                        width: "100px",
                        margin: "auto",
                    }}
                >
                    <Loader />
                </div>):(<span></span>)}
      <div className='main2'>
        <div className="main-r" style={{ marginRight: "30%" }}  >
          <button className='back'  style={{color:'black'}}  onClick={(event) => { navigate('/') }}>  &larr; </button>
       
          
          <div style={{marginTop:'50px'}}>welcome to Register page</div>
          <div className="text1">
          
            <div>already existing member  </div>
            <button className="button-navig" onClick={(event) => { navigate('/login') }}>Login</button>
          </div>
          
          <div class="g-input">
  <input type="text" id="user-name2" name="username" placeholder=" "   onChange={handleChange}  value={formData.username} />
  <label for="user-name2">Username</label>
</div>
<div class="g-input">
  <input type="text" id="email" name="email" placeholder=" "onChange={handleChange}  value={formData.email} />
  <label for="email">e-mail</label>
</div>
<div class="g-input">
  <input type="password" id="password2" name="password" placeholder=" "  onChange={handleChange}  value={formData.password} />
  <label for="password2">Password</label>
</div>
<div class="g-input">
  <input type="password" id="repass" name="repass" placeholder=" "  onChange={handleChange}  value={formData.repass} />
  <label for="password2">Re-enter Password</label>
</div>
<button className="button-navig" onClick={submitHandler} >Submit</button>
          </div>
         
          
      </div>
      <ToastContainer
        position="top-left"
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

export default Register;
