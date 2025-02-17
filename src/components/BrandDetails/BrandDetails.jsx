import React, { useEffect, useState } from 'react'
import styles from "./BrandDetails.module.css"
import { Navigate, useParams } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'

export default function BrandDetails() {

  let {id} = useParams()
  const [brandDetails, setBrandDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)



  function navigate(){
   return <Navigate to="/brands"></Navigate>
  }
 
  
  



  

 
  

  async function getBrandDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`).then((data)=>{
     console.log(data?.data.data);
     
      setBrandDetails(data?.data.data)
      setIsLoading(false)
      
    }).catch((err)=>{
      console.log(err);
      setIsLoading(false)
      
    })

    
  }

  useEffect(() => {
    getBrandDetails()
  }, [])
  


  
  return (
 <>

 {isLoading ? <Loader/> :  <div onClick={()=>navigate()} className="mx-auto h-[100vh] brandD">

<div  className=" m-auto flex relative">

  <div className="absolute right-[100px]">
    <Link to="/brands"><i className="fa-solid fa-right-from-bracket font-extrabold text-3xl text-main "></i></Link>
  </div>

<div className="bg-white mx-auto flex justify-between border-[2px] my-2 ">
<div className=" p-10">
    <h1 className="font-bold text-5xl text-[#0aad0a] " >{brandDetails.name}</h1>
    <p>{brandDetails.slug}</p>
  </div>
  <div >
    <img src={brandDetails.image} className="w-full" alt="" />
    <Link to="/brands"><button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">close</button>
    </Link>

  </div>
  
</div>



</div>


</div>}







</>

  )
}
