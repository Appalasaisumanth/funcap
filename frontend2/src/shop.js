import React, { useState, useEffect } from "react";
import './shop.css'
import { useNavigate } from 'react-router-dom';
import StarRating from './assests/StarRating'; // Add custom styles here
import Loader from "./assests/Loader";
import { useCart } from './CartContext';
//import Example from "./assests/Example";



function Shop() {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(true);
    //const [quantity,updatequantity]=useState(Array(16).fill(0));
    const [available,setavailable]=useState(Array(16).fill(0));
   // const [price,setPrice]=useState(0);
    const [items,setItems]=useState(0);
    const { products,price,quantity ,updateProducts, updatePrice,updatequantity } = useCart();

    let obj = {
        CSK: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/368px-Chennai_Super_Kings_Logo.svg.png"
        , MI: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/1200px-Mumbai_Indians_Logo.svg.png",
        SRH: "https://i.pinimg.com/474x/21/78/84/2178841ae0f590cc4767090063f2ae4b.jpg",
        RCB: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Royal_Challengers_Bengaluru_Logo.png/240px-Royal_Challengers_Bengaluru_Logo.png"
    };
    var temp = "";
    const [theme, setTheme] = useState(
        temp
    );
  
    useEffect(() => {
        let team = localStorage.getItem('user').split('+')[0];
        console.log(team);
        if (team) {
            setTheme(team);
        }
        else {
            alert('login/register in home page to buy products');
        }
    }, []);


    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const getProducts = async () => {
            const resp = await fetch(`https://fulltoss-backend-9igo.onrender.com/product/${theme}`);
            if (resp.ok) {
                const response = await resp.json();
                updateProducts(response.message);
                setisLoading(false);
            }
        };
        getProducts();
    }, [theme]);

    const decrementQuantity = (index) => {
       
        if (quantity[index] > 0) {
          
          const newQuantity = [...quantity];
          
          newQuantity[index] -= 1;
          var temp2=[...available];
          temp2[index]+=1;
          setavailable(temp2);
        
          updatequantity(newQuantity);
         
        }
      };
      const IncrementQuantity = (index) => {
       
   
          
          const newQuantity = [...quantity];
          
          newQuantity[index] += 1;
          var temp2=[...available];
          temp2[index]-=1;
          setavailable(temp2);
        
          updatequantity(newQuantity);
        
        
      };
useEffect(()=>{
    var temp=0;
    var ite=0;
    for(var i=0;i<16;i++)
    {
        if(quantity[i]>0)
        {
            temp+=(products[i].price)*quantity[i];
            ite+=1;

        }
    }
    updatePrice(temp);
    setItems(ite);
 

},[quantity,products]);

useEffect(()=>{
    var temp=[];
   
    for(var i=0;i<16;i++)
    {
      temp.push(200+Math.floor(Math.random()*100));
    }
    setavailable(temp);
},[]);


    return (
        <div >
            <div className='home-header2'>
                <div style={{ display: 'flex' }}>
                    <div className='app-logo' >
                        <img src={obj[theme]} alt="ipl-cap" />
                    </div>
                    <div className='app-list' class='glow' style={{ marginLeft: '10vw', marginRight: 'auto' }}>
                        WELCOME TO {theme} FAN STORE
                    </div>
                    {theme && <button type='button' className="final-button" style={{ width: 'max(70px,10vw)', fontSize: '18px', marginTop: '15px' }} onClick={(event) => { navigate('/payment') }}> change-team </button>}
                    <div className='app-header-end'>
                        <button type='button' className='back' style={{ position: 'relative' }} onClick={(event) => { navigate('/') }}> &larr;</button>
                    </div>
                </div>
            </div>
            <div className='main-shop'>
                <div className='fixed-left'>
                    <div className='app-logo' style={{ marginLeft: '80px', maxHeight: '50px', maxWidth: '50px' }} >
                        <img src={obj[theme]} alt="ipl-cap" />
                    </div>
                    <div >Available items</div>
                    {products.length > 0 ? (products.map((back, index) => (<div className='items' >
                        <a href={'#card-outline' + String(index)}> {back.name}</a>:{available[index]}
                    </div>))) : (isLoading ? (
                        <div
                            style={{
                                width: "100px",
                                margin: "auto",
                            }}
                        >
                            <Loader />
                        </div>) : (<span></span>))
                    }
                </div>
                <div className='fixed-right'>

                    {products.length > 0 ? (products.map((back, index) => (<div key={index} className='card-outline' id={"card-outline" + String(index)}>
                        <div className='image-holder'>
                            <img src={back.image_url} alt=" product" />
                        </div>
                        <div style={{ textAlign: 'center' }}>{back.name}</div>
                        <div>{back.Description}</div>
                        <div>price:{"\u20B9"}{back.price}</div>
                        <div style={{ display: "flex" }}> <StarRating rating={back.rating} /> {back.rating}/5</div>
                        <div style={{ display: 'flex' }}>
                            Quantity:
                            <div className='buttons1' style={{ marginLeft: '0px', fontSize: '25px' }}>
                                <button onClick={()=>{  IncrementQuantity(index)}}>+</button>
                                <button >{quantity[index]}</button>
                                <button onClick={()=>{ decrementQuantity(index) }}>-</button>
                            </div>
                        </div>
                        <div className='buttons2' >
                            <button onClick={(event)=>{navigate('/confirm');}}
                            >
                               Buy Now
                            </button>
                          

                            <button onClick={(event)=>{navigate('/cart')}}>see cart<img id="image2" height={5} width={5} alt="cart" src='./cart.png'></img></button>
                        </div>
                    </div>))) : (isLoading ? (
                        <div
                            style={{
                                width: "100px",
                                margin: "auto",
                            }}
                        >
                            <Loader />
                        </div>) : (<span></span>))}
                </div>
            </div>
                             
            <div className='shop-footer'>
                <div className="cart">
                    <button type='button' className="final-button" onClick={(event)=>{navigate('/cart')}}>
                    <img alt="cart" src='./cart.png'></img>cart {items}
                </button>       
                </div>
                <button type='button' className="final-button" onClick={(event)=>{navigate('/confirm')}}>
                    Buy now {"\u20B9"}{price}
                </button>
            </div>
        </div>
    );
}

export default Shop;
