import React, { useContext, useEffect, useState } from 'react'
import styles from "./ProductDetails.module.css"
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Slider from 'react-slick/lib/slider';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/Cartcontext';


export default function ProductDetails() {


  

  
  let {id ,category} = useParams();
  console.log(id);


  let {addToCart , addToWishList} = useContext(CartContext)


  async function addProductToWishList(productId) {
    let response = await addToWishList(productId);
    console.log(response , "heart");
    
    
  }
  
  
    async function addProductToCart(productId) {
  
      let response = await addToCart(productId)
      console.log(response);
      
      
    }

  const [productDetailes, setProductDetailes] = useState({});
  const [isloading, setIsloading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [relatedProduct, setRelatedProduct] = useState([])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows : false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

 async function getproductDetailes(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data)=>{
      console.log(data.data.data);
      
      setProductDetailes(data?.data.data)
      setIsloading(false)
    }).catch((err)=>{
      setErrorMessage(err.message)
      console.log(err);
      setIsloading(false)
      
    })
  }

  async function getRelatedProducts(params) {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products").then((data)=>{
      console.log(data.data.data , "details");

      let relatedProducts = data?.data.data ;
      relatedProducts = relatedProducts.filter((product)=> product.category.name == category)
      setRelatedProduct(relatedProducts)
      
    })
    .catch((err)=>{
      console.log(err);
      

    })
  }

  useEffect(() => {
    getproductDetailes()
    getRelatedProducts()
  
 
  }, [])

  useEffect(() => {
    getproductDetailes()

   
  }, [id])



  
  


//   function getProductDetails(){
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
//   }

//  let {data, isLoading ,error ,isError} = useQuery({
//     queryKey : ["productDetails"],
//     queryFn : getProductDetails,
//   })
  

//   console.log(productDetailes);
  

  return (
    <>

    <div className="container mx-auto">
      {isloading ? <Loader/> : <div className="flex gap-4">
        <div className="w-1/4">
        {/* <img src={productDetailes.imageCover} className="w-full" alt="" /> */}


        <Slider {...settings}>

          {productDetailes?.images?.map((src)=><img src={src}  alt="" />)}
     
    </Slider>
        
        </div>
        <div className="w-3/4 mt-5">
        <h1 className="text-black font-bolder text-2xl my-5">{productDetailes.title}</h1>
        <h3 className="text-gray-700 my-5">{productDetailes.description}</h3>
        <p className="my-5">{productDetailes.category?.name}</p>
        <div className="flex justify-between align-center">
          <div>{productDetailes.price} EGP</div>
          <div><i className=" rating-color fa fa-star m-4">{productDetailes.ratingsQuantity}</i></div>
        </div>
        <div >
        <div className="flex"> 

<button onClick={()=>addProductToCart(productDetailes._id)} className="bg-main btn w-full rounded-lg text-white px-2 py-3">Add to cart</button>
<i onClick={()=>addProductToWishList(productDetailes._id)} className="fa-solid fa-heart text-xl m-4"></i>

        </div>

        </div>
        </div>
      </div>}
     
    </div>



    <div className="container mx-auto mt-20">
          
          {isloading ? <Loader/> :<div className="flex flex-wrap">
           {relatedProduct.map((product)=> <div key={product._id} className="sm:w-full md:w-1/4 lg:w-1/6 ">
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
              <button onClick={()=>addProductToCart(productDetailes._id)} className="bg-main btn w-full rounded-lg text-white px-2 py-3">Add to cart</button>
              <i onClick={()=>addProductToWishList(productDetailes._id)} className="icons fa-solid fa-heart text-xl"></i>

            </div>
           </div>
            </div>)}
          </div> }
          
        </div>
    
    
    </>
  )
}
