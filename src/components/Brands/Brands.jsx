import React, { useEffect, useState } from 'react'
import styles from "./Brands.module.css"
import axios from 'axios'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { decreament, getBrands, incByValue, increament } from '../../Redux/ProductSlice'
import { Link } from 'react-router-dom'
import BrandDetails from '../BrandDetails/BrandDetails'

export default function Brands() {
  const [isLoading, setIsLoading] = useState(true)
   


 let {brands} =  useSelector((state)=> state.productRed)
 let dispatch = useDispatch()

 

console.log(brands , "brands");



 async function getdata(){
  await dispatch(getBrands());
  setIsLoading(false)
  
 }

 useEffect(() => {
  getdata()
   
 }, [])










  return (
   
    <>

    


    {isLoading ? <Loader/> :   <div  className="container mx-auto my-8 text-center">
    <h1 className="text-center text-[#0aad0a] p-10 text-6xl font-extrabold">All Brands</h1>
        <div className="flex flex-wrap">
             {brands.map((brand)=> <div key={brand._id6} id="default-modal" className="sm:w-full md:w-1/4  ">
             <div className="product px-2 py-3">
      
      
      
      
             <Link to={`/brandDetails/${brand._id}`}>
      
      
             <img src={brand.image} className="w-full" alt="" />
              <h3 className="text-main text-sm">{brand.name}</h3>
             
             
             
             </Link>
      
      
      
      
      
              
             </div>
              </div>)}
            </div> 
   
    </div>}



    <div className="container mx-auto my-8 text-center">
        <div className="flex flex-wrap">
             {brands.map((brand)=> <div key={brand._id} className="sm:w-full md:w-1/4  ">
             <div className="product px-2 py-3">
      
      
      
      
             <Link to={`/brandDetails/${brand.id}`}>
      
      
             <img src={brand.image} className="w-[200px] h-[250]" alt="" />
              <h3 className="text-main text-sm">{brand.name}</h3>
             
             
             
             </Link>
      
      
      
      
      
              
             </div>
              </div>)}
            </div> 

            
   
    </div>











   
      
    </>
  )
}
