
import './Login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './assests/Loader';
function Payment() {
  const navigate = useNavigate();
  
  const [team, setTeam] = useState("");
  const [existing,setExisting]=useState('');
  const [message, setMessage] = useState("");
  const [username,setUsername]=useState('');
  const [isLoading,setIsLoading]=useState(false);
 
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
    const temp=localStorage.getItem('user').split('+')[1];
    const temp2=localStorage.getItem('user').split('+')[0];
    setExisting(temp2);

    setUsername(temp);
  },[]);
  const submitHandler = async (event) => {
    event.preventDefault();
    
    //console.log("Submitting", formData);
    if(team){
        if(team===existing)
        {
            setMessage('no need to update,u wish for same team continue');
            return;
        }
        console.log(team);
        setIsLoading(true);
      const formDatatoSend ={username: username,team:team};
          const response = await fetch('https://fulltoss-backend-9igo.onrender.com/update', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDatatoSend),
  });
  
   if(response.ok)
   {//console.log(response.json);
    const temporary = await response.json(); // Await the json() call
    setMessage(temporary.message);
    setMessage('your team is updated to '+team);
    localStorage.setItem("user", team+ "+" + username);
    setIsLoading(false);
   setTimeout(()=>{navigate('/shop');},5000); 
    
}
   
   else
   {
    const temporary = await response.json();
    setMessage(temporary.message);
    setIsLoading(false);
    //console.log(temporary.error);
    
    
   }}
   else{
    setMessage("input team");
   }
  };
  return (
    <div className="Login" >
      <div className="main2">
        <div className="main">
          <button className='back' style={{color:'black'}} onClick={(event) => { navigate('/') }}> &larr;</button>
      
          {isLoading ? (
                <div
                    style={{
                        width: "100px",
                        margin: "auto",
                    }}
                >
                    <Loader />
                </div>):(<span></span>)}
          <div>
  <label htmlFor="team">Team to update:</label>
  <select id="team" style={{width:'100px'}} className="g-input" name="team" value={team} onChange={(e) => setTeam(e.target.value)}>
  <option value="">select</option>
    <option value="CSK">CSK</option>
    <option value="MI">MI</option>
    <option value="SRH">SRH</option>
    <option value="RCB">RCB</option>
  </select>
</div>

          
          <button className="button-navig" onClick={submitHandler} >Submit</button>

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

export default Payment;
