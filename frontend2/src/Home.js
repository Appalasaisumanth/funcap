
import './App.css';
import React from 'react'
import { useNavigate } from "react-router-dom"
function Home() {
  const navigate = useNavigate();
  const handleScroll = () => {
    const aboutElement = document.querySelector(".about");
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="App">
      <div className='home-header'>
        <div className='app-logo'>
          <img style={{ mixBlendMode: "multiply" }} src="https://i.pinimg.com/736x/c1/cd/77/c1cd779977a32849a83d66625d47cad8.jpg" alt="ipl-cap" />
          <div style={{ paddingBottom: "3px" }}>
            FUNCAP
          </div>
        </div>
        <div className='app-list'>
          <ul>
            <button onClick={handleScroll}>about</button>
            <button onClick={(event) => { navigate('/shop') }}>shop</button>
            <button onClick={(event) => { navigate('/login') }}>login</button>
          </ul>
        </div>
        <div className='app-header-end'>
          new to Funcap register here &rarr; <button style={{ backgroundColor: "darkred" }} onClick={(event) => { navigate('/register') }} className='button-navig'>Register</button>
        </div>
      </div>
      <div className='container'>
        <div class="carousel">
          <ul>
            <li>

              <img alt="rcb-kit" src="https://5.imimg.com/data5/GLADMIN/Default/2024/3/404280398/SV/YT/RV/3573903/rcb-ipl-t-shirts-and-kit-in-hyderabad-1000x1000.jpg" />
              <button className='button-navig'onClick={(event) => { navigate('/shop') }} >Shop Now</button>
            </li>
            <li>
              <img alt="csk-kit" src="https://5.imimg.com/data5/SELLER/Default/2024/3/403335464/BK/XY/HP/3573903/csk-ipl-t-shirt-and-kit.jpg" />
              <button className='button-navig' onClick={(event) => { navigate('/shop') }} >Shop Now</button>
            </li>
            <li>
              <img alt="led-stumps" src="https://5.imimg.com/data5/GL/VY/CZ/SELLER-48484053/led-cricket-stump.png" />
              <button className='button-navig' onClick={(event) => { navigate('/shop') }} >Shop Now</button>
            </li>
            <li>
              <img alt="wickets and ball" src="https://m.media-amazon.com/images/I/51jb+5zmrzL.jpg" />
              <button className='button-navig' onClick={(event) => { navigate('/shop') }} >Shop Now</button>
            </li>
            <li>
              
              <img alt="dc stickered cup" src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSFSTMwxsBxB0VJk6UYdNnFfYovieehC886Iucs7MCweisvnfwGj8CH_5TVJFJRc6qAMItVEAQ_NntJXOlpC1jSlxsCChIkRisY6m71e2qCWySGCycqWR_f&usqp=CAE" />
              <button className='button-navig' onClick={(event) => { navigate('/shop') }} >Shop Now</button>
            </li>
            <li>
              <img alt="ipl Throphy" src="https://5.imimg.com/data5/SELLER/Default/2022/1/XW/ZK/TB/133629531/6.jpg" />
              <button className='button-navig' onClick={(event) => { navigate('/shop') }} >Shop Now</button>
            </li>
          </ul>
          <ul>
            <li>

              <img alt="rcb-kit" src="https://5.imimg.com/data5/GLADMIN/Default/2024/3/404280398/SV/YT/RV/3573903/rcb-ipl-t-shirts-and-kit-in-hyderabad-1000x1000.jpg" />
              <button className='button-navig' onClick={(event) => { navigate('/shop') }} >Shop Now</button>
            </li>
            <li>
              <img alt="csk-kit" src="https://5.imimg.com/data5/SELLER/Default/2024/3/403335464/BK/XY/HP/3573903/csk-ipl-t-shirt-and-kit.jpg" />
              <button className='button-navig'  onClick={(event) => { navigate('/shop') }}>Shop Now</button>
            </li>
            <li>
              <img alt="led-stumps" src="https://5.imimg.com/data5/GL/VY/CZ/SELLER-48484053/led-cricket-stump.png" />
              <button className='button-navig' onClick={(event) => { navigate('/shop') }} >Shop Now</button>
            </li>
            <li>
              <img alt="wickets and ball" src="https://m.media-amazon.com/images/I/51jb+5zmrzL.jpg" />
              <button className='button-navig' onClick={(event) => { navigate('/shop') }} >Shop Now</button>
            </li>
            <li>
              <img alt="dc stickered cup" src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSFSTMwxsBxB0VJk6UYdNnFfYovieehC886Iucs7MCweisvnfwGj8CH_5TVJFJRc6qAMItVEAQ_NntJXOlpC1jSlxsCChIkRisY6m71e2qCWySGCycqWR_f&usqp=CAE" />
              <button className='button-navig' onClick={(event) => { navigate('/shop') }} >Shop Now</button>
            </li>
            <li>
              <img alt="ipl Throphy" src="https://5.imimg.com/data5/SELLER/Default/2022/1/XW/ZK/TB/133629531/6.jpg" />
              <button className='button-navig' onClick={(event) => { navigate('/shop') }}  >Shop Now</button>
            </li>
          </ul>






        </div>
      </div>
      <div className='about' height={1000}>
     
        <div className='about-container'>
        <div>
        <img alt="employees" src="https://www.shiftbase.com/hs-fs/hubfs/c187c50f-4bd8-4d3b-9edc-2b809c83fc1a.jpeg.png?width=725&name=c187c50f-4bd8-4d3b-9edc-2b809c83fc1a.jpeg.png"/>
          
          </div>
          <div>
            we FUNCAP is a online ipl goods selling platform with <em>250,000+</em> monthly customers with daily <em>300+</em> different items added to our products
            </div>
            <div>
            we have nearly <em>5000+</em> employees currently in our team with total <em>1crore</em> revenue generating per year
          </div>
          <div>
            here we sell all items that are for ipl  with most affordable prices in best quality
          </div>

        </div>
      </div>
  
      <div style={{fontSize:"30px", marginTop:"30px", color:'wheat'}}>Thanks for visiting,visit again</div>

    </div>
  );
}

export default Home;
