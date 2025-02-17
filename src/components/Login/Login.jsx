// import React from 'react'
import React, { useContext, useState } from 'react'

import styles from "./Login.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { TokenContext } from '../../Context/TokenContext';
import { Link } from 'react-router-dom';

export default function Login() {

  let {token, setToken} = useContext(TokenContext)



  const [userMessage, setUseressage] = useState(null)
    const [errmessage, setErrmessage] = useState(null)
    const [isloading, setIsloading] = useState(false)
    let navigate = useNavigate()

     let mySchema = Yup.object({
        email: Yup.string().required("email is required").email("not valid email"),
        password: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,8}$/, "not valid password"),
      })


       let formik = useFormik({
          initialValues: {
           
            email: "",
            password: "",
          
          },
          // validate,
          validationSchema: mySchema,
          onSubmit: (values) => {
            loginFrom(values)
      
          }
        });


        async function loginFrom(values) {
          setIsloading(true)
          return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin ", values).then((data)=>{
            console.log(data , "login");
            localStorage.setItem("userToken", data.data.token)
            setToken(data.data.token)
            setUseressage(data.data.message)
            
            
            setIsloading(false)
            navigate("/")
            
          }).catch((err)=>{
            console.log(err.response.data.message);
            setErrmessage(err.response.data.message)
            setIsloading(false)
            
          })
          
      
        }
  return (
    <>
    &lt;&gt;

    <div className="container w-1/2 mx-auto">
      <div className=" mx-auto">
        <h1 className="text-main text-3xl">Login Now:</h1>
        {userMessage ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
<p>{userMessage}</p>
</div>: null}

{errmessage ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<p>{errmessage}</p>
</div> :null}
        <form onSubmit={formik.handleSubmit}>
         
         

          <div className="my-2">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input name="email" onBlur={formik.handleBlur} type="email" onChange={formik.handleChange} value={formik.values.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formik.touched.email && formik.errors.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.email}</p>
          </div> : null}
          </div>

          <div className="my-2">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input name="password" onBlur={formik.handleBlur} type="password" onChange={formik.handleChange} value={formik.values.password} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formik.touched.password && formik.errors.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.password}</p>
           
          </div>
          
           : null}
          </div>

          <div className="">
              <Link to ="/forgetpassword">Forget Your Password ?</Link>
               </div>



          

         
          

         
       

          {isloading ?<div className="my-4 text-end">
            <button type='submit' className="bg-main text-white px-4 py-2 rounded-lg">
              <i className="fa fa-spinner"></i>
            </button>
          </div> : <div className="my-4 text-end">
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="bg-main text-white px-4 py-2 rounded-lg">login</button>
          </div>}


          
          
        </form>
      </div>
    </div>
  </>
  )
}
