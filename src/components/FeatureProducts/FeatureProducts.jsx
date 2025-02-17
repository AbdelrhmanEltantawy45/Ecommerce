import React, { useContext, useEffect, useState } from 'react'
import styles from "./FeatureProducts.module.css"
import axios from 'axios'
import Loader from '../Loader/Loader'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/Cartcontext'


export default function FeatureProducts() {

  let {addToCart , addToWishList} = useContext(CartContext)

  async function addProductToWishList(productId) {
    let response = await addToWishList(productId);
    console.log(response , "heart");
    
    
  }



  async function addProductToCart(productId) {

    let response = await addToCart(productId)
    console.log(response , "res orp");
    
    
  }

  function getFeatureProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }


let {data, isError ,isLoading ,isFetching ,error} =  useQuery({
    queryKey : ["featureProducts"],
    queryFn : getFeatureProducts,
    
  })
  console.log(data , "data res");
  


  console.log(error);
  
  // console.log(data?.data?.data);
  


  // const [products, setProducts] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  // async function getProducts() {
  //   return await axios.get("https://ecommerce.routemisr.com/api/v1/products").then((data)=>{
  //     console.log(data.data.data);
  //     setProducts(data.data.data)
  //     setIsLoading(false)
      
  //   }).catch((err)=>{
  //     console.log(err);
  //     setIsLoading(false)
      
      
  //   }) 
  // }


  // useEffect(()=>{
  //   getProducts()
  // },[ ])




  return (

    <div className="container mx-auto">
      {isError ? <p>{error.message}</p> : null }
      {isLoading ? <Loader/> :<div className="flex flex-wrap">
       {data?.data?.data.map((product)=> <div key={product._id} className="sm:w-full md:w-1/4 lg:w-1/6 ">
       <div className="product px-2 py-3">




       <Link to={`/productdetails/${product.id}/${product.category.name}`}>


       <img src={product.imageCover} className="w-[200px] h-[250]" alt="" />
        <h3 className="text-main text-sm">{product.category.name}</h3>
        <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
        <div className="flex justify-between align-center">
          <div>{product.price} EGP</div>
          <div><i className=" rating-color fa fa-star">{product.ratingsAverage}</i></div>
        </div>
       
       
       </Link>





        <div >
          <button onClick={()=>addProductToCart(product._id)} className="bg-main btn w-full rounded-lg text-white px-2 py-3">Add to cart</button>
          <i onClick={()=>addProductToWishList(product._id)} className="icons fa-solid fa-heart text-xl"></i>
          

        </div>
       </div>
        </div>)}
      </div> }
      
    </div>
  )
}
