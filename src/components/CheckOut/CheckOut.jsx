import React, { useContext } from 'react'
import styles from "./CheckOut.module.css"
import { useFormik } from 'formik';
import { CartContext } from '../../Context/Cartcontext';
import { useLocation } from 'react-router';

export default function CheckOut() {

  
  let {onlinePayment} = useContext(CartContext)
  


    let formik = useFormik({
            initialValues: {
             
            details: "",
        phone: "",
        city: ""
            
            },
            
            onSubmit: (values) => {
              payOnline(values)
             
        
            }
          });

          async function payOnline(values) {
            await onlinePayment(values)

            
          }



  return (
    <>

    <div className="w-1/2 mx-auto">
    <form onSubmit={formik.handleSubmit}>
         
         

          <div className="my-2">
            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
            <input name="details" onBlur={formik.handleBlur} type="text" onChange={formik.handleChange} value={formik.values.details} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formik.touched.details && formik.errors.details ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.details}</p>
          </div> : null}
          </div>

          <div className="my-2">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <input name="phone" onBlur={formik.handleBlur} type="tel" onChange={formik.handleChange} value={formik.values.phone} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formik.touched.phone && formik.errors.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.phone}</p>
          </div> : null}
          </div>


          <div className="my-2">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
            <input name="city" onBlur={formik.handleBlur} type="text" onChange={formik.handleChange} value={formik.values.city} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formik.touched.city && formik.errors.city ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.city}</p>
          </div> : null}
          </div>
          

         
          

         
       

         
           
          <div className="my-4 text-end">
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="bg-main text-white px-4 py-2 rounded-lg">PayNow</button>
          </div>


          
          
        </form>
    
    </div>
    
    
    </>
  )
}
