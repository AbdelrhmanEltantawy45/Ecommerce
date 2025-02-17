import React, { useEffect, useState } from 'react'
import styles from "./CategoriesDetails.module.css"
import { useParams } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom';


export default function CategoriesDetails() {

  const [catDetails, setCatDetails] = useState({})

  let {id} = useParams()


  async function getCategoriesDetails(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`).then((response)=>{
      console.log(response, "cattttttt");
      setCatDetails(response?.data?.data)
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }


  useEffect(() => {
    getCategoriesDetails()

    
  }, [])
  



  return (
    <>

    

    <div className=" mx-auto relative bg-[gray]  h-100vh">


    <div className="absolute right-[100px]">
      
      <Link to="/categories"><i className="fa-solid fa-right-from-bracket font-extrabold text-3xl text-main "></i></Link>

    </div>

      

      <h1 className="text-center text-main font-extrabold text-5xl">{catDetails.name}</h1>
      <div className="sm:w-full md:w-1/2 h-100px m-auto   text-center my-10 rounded-md ">
      <img src={catDetails.image} className="w-full" alt="" />



      </div>

     
    
    </div>
    
    </>
  )
}
