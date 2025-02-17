import React from 'react'
import styles from "./MainSlider.module.css"
import slider1 from "./../../assets/grocery-banner (1).png"
import slider2 from "./../../assets/grocery-banner-2 (1).jpeg"
import slider3 from "./../../assets/slider-2 (1).jpeg"
import slider4 from "./../../assets/slider-image-1 (1).jpeg"
import slider5 from "./../../assets/slider-image-2 (1).jpeg"

import Slider from 'react-slick/lib/slider';


export default function MainSlider() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows : false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <>

<div className="container mx-auto my-10">

  <div className="flex">
     <div className="w-3/4">
     <Slider {...settings}>
          
          <img src={slider3} className="h-[400px] " alt="" />
          <img src={slider4} className="h-[400px]" alt="" />
          <img src={slider5} className="h-[400px]" alt="" />
               
              </Slider>
     </div>
     <div className="w-1/4">
     <img src={slider1} className="h-[200px]" alt="" />
     <img src={slider2} className="h-[200px]" alt="" />
     </div>
  </div>

  </div>

    
    </>
  )
}
