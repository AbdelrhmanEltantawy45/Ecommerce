import React, { useContext, useEffect, useState } from 'react'
import styles from "./WishList.module.css"
import { CartContext } from '../../Context/Cartcontext'
import Loader from '../Loader/Loader'

export default function WishList() {

  const [wishListItem, setwishListItem] = useState([])
  const [isLoading, setisLoading] = useState(true)

  let {getToWishList ,addToCart , removeWishList} = useContext(CartContext)


  async function getAllWishList() {
    let response = await getToWishList()
    console.log(response , "ywdywfdyfwdfywwgggwwg");
    setwishListItem(response.data.data)
    setisLoading(false)
    
    
  }

  async function addcartitem(productId) {
    let response = await addToCart(productId)
    console.log(response);
    setisLoading(false)
    
    
  }

  async function clearWishListitem(productId) {
    let response = await removeWishList(productId)
    console.log(response);
    getAllWishList()
    
    setisLoading(false)
    
    
  }

  useEffect(() => {

    getAllWishList()
    
    
  }, [])

  
  


  return (
    < >

{isLoading ? <Loader/> : <div className="container mx-auto">
<div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Add To Cart
        </th>
       
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {wishListItem.map((item)=> <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        <button onClick={()=>addcartitem(item._id)}  className="bg-main btn  rounded-lg text-white px-2 py-3">Add to cart</button>

        </td>
      
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.price}
        </td>
        <td  className="px-6 py-4">
          <a  onClick={()=>clearWishListitem(item._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>)}
     
   
    </tbody>
  </table>
</div>
</div>}
   






    
    
    </>
  )
}
