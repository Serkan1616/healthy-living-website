import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Home1 from "../img/home1.jpg"
import Home2 from "../img/home2.jpg"
import Home3 from "../img/home3.jpg"

const OriHome = () => {
 const [index, setIndex] = useState(0);
 const handleSelect = (selectedIndex) => {
 setIndex(selectedIndex);

}

    
  return (

    <div className='orihome'>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <img
       style={{ width: '100%', height: '25%', objectFit: 'cover' }}
         src={Home1}
         alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to our website</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
        style={{ width: '100%', height: '25%', objectFit: 'cover' }}
          src={Home2}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>You Can Upload Your Blog</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
        style={{ width: '100%', height: '25%', objectFit: 'cover' }}
         src={Home3}
         alt="First slide"
        />
        <Carousel.Caption>
          <h3>You Can Calculate Your Daily Calorie</h3>
          <p>
            
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <div>
    </div>

    </div>
  )
}

export default OriHome