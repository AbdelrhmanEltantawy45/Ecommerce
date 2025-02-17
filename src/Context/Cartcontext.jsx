import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext()



let headers = {
    token: localStorage.getItem("userToken")
}


export default function CartContextProvider(props){

    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartId, setcartId] = useState(null)

    async function addToCart(productId) {
        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            productId,
        } , {
            headers,
        }
    ).then((response)=>{
        console.log(response.data.data._id , "add");
        setcartId(response.data.data._id)
        setTotalCartPrice(response.data.data.totalCartPrice)
        setNumOfCartItems(response.data.numOfCartItems)
        toast.success(response.data.message)
        return response
        
    }).catch((err)=>{
        // console.log(err);
        toast.error(response.data.message)
        return err
        
    })
        
    }


    async function getCart() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers,
        }
    ).then((response)=>{
        // console.log(response, "getCart");
        setNumOfCartItems(response.data.numOfCartItems)
        setcartId(response.data.data._id)
        setTotalCartPrice(response.data.data.totalCartPrice)
        return response
        
    }).catch((err)=>{
        // console.log(err);
        return err
        
    })
        
    }


    async function removeCartItem(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers,
        }
    ).then((response)=>{
        // console.log(response , "remove");
        setNumOfCartItems(response.data.numOfCartItems)
        setcartId(response.data.data._id)
        setTotalCartPrice(response.data.data.totalCartPrice)
        return response
        
    }).catch((err)=>{
        // console.log(err);
        return err
        
    })
        
    }

    async function updateProduct(productId , count) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count,
        }, {
            headers,
        }
    ).then((response)=>{
        // console.log(response , "update");
        setNumOfCartItems(response.data.numOfCartItems)
        setcartId(response.data.data._id)
        setTotalCartPrice(response.data.data.totalCartPrice)
        return response
        
    }).catch((err)=>{
        // console.log(err);
        return err
        
    })
        
    }


    async function onlinePayment(shippingAddress) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`,{
            shippingAddress,
        }, {
            headers,
        }
    ).then((response)=>{
        // console.log(response , "update");
       console.log(response.data.session.url);
       window.location.href=  response.data.session.url ;
       
      
        return response
        
    }).catch((err)=>{
        // console.log(err);
        return err
        
    })
        
    }

    async function clearAllCart() {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers,
        }
    ).then((response)=>{
        // console.log(response , "clear");
        setTotalCartPrice(0)
        
        return response
        
    }).catch((err)=>{
        // console.log(err);
        return err
        
    })
        
    }

    async function addToWishList(productId) {

        return await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist" , {
            productId
        },{
            headers,
        }).then((response)=>{
            console.log(response);
            toast.success(response.data.message)
            return response
            
        }).catch((err)=>{
            console.log(err);
            toast.error(response.data.message)

            return err
            
        })
        
    }

    async function getToWishList() {

        return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" ,{


            headers,


        }).then((response)=>{
            console.log(response , "getWish");
            return response
            
        }).catch((err)=>{
            console.log(err);

            return err
            
        })
        
    }

    async function removeWishList(productId) {

        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` ,{


            headers,


        }).then((response)=>{
            console.log(response , "remove");
            return response
            
        }).catch((err)=>{
            console.log(err);

            return err
            
        })
        
    }
    

    return <CartContext.Provider value={{ addToCart, removeWishList , addToWishList, getToWishList ,  onlinePayment , getCart , removeCartItem , updateProduct , clearAllCart , numOfCartItems , totalCartPrice}}>


        {props.children}
    </CartContext.Provider>

}