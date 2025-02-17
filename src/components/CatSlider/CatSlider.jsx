import React from 'react'
import styles from "./CatSlider.module.css"
import { Query, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Slider from 'react-slick/lib/slider';


export default function CatSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows : false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  function getCatSlider(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }


  let {data} = useQuery({
    queryKey: ["catSlider"],
    queryFn: getCatSlider,
  })

  console.log(data?.data , "CatSlider");
  



  return (
    <>

    <div className="container mx-auto my-10">

      <p></p>

      <Slider {...settings}>
      
                {data?.data.data.map((cat)=>
                  <div key={cat._id} className="text-center">
                    <img src={cat.image} className="h-[200px]" alt="" />
                    <p>{cat.name}</p>
                  </div>
                )}
           
          </Slider>


    </div>
    
    </>
  )
}
