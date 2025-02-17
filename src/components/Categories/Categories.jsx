import React, { useEffect, useState } from 'react'
import styles from "./Categories.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../Redux/ProductSlice'
import { Link, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import axios from 'axios'

export default function Categories() {

  let {id} = useParams()

  let {categories} = useSelector((state)=>state.productRed)
  console.log(categories , "cattttt");
  
  const [isLoading, setIsLoading] = useState(false)
  let dispatch = useDispatch()

  console.log(categories , "categories");


  async function getdatacat(){
    await dispatch(getCategories());
    setIsLoading(false)
    
   }


   useEffect(() => {
     getdatacat()
      
    }, [])


    async function specificCategory(){
      return await axios.get("https://ecommerce.routemisr.com/api/v1/categories/6407ebf65bbc6e43516931ec").then((data)=>{
        console.log(data);
        
      }).catch((err)=>{
        console.log(err);
        
      })
    }

    // useEffect(() => {

    //   specificCategory()
      
    // }, [id])
    
  



  return (
    <>

    {isLoading ? <Loader/> : <div className="container mx-auto my-8 text-center">
      <div className="flex flex-wrap">
                   {categories.map((cat)=> <div key={cat._id} id="default-modal" className="sm:w-full md:w-1/3  ">
                   <div className="product px-2 py-3">
            
            
            
            
                   <Link to={`/categoriesdetails/${cat._id}`}>
            
            
                   <img src={cat.image} className="imgcat w-full h-[400px] " alt="" />
                    <h3 className="text-main text-3xl font-extrabold">{cat.name}</h3>
                   
                   
                   
                   </Link>
            
            
            
            
            
                    
                   </div>
                    </div>)}
                  </div> 
    </div> }

    


    </>
  )
}
