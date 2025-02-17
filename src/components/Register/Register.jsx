import React, { useState } from 'react'
import styles from "./Register.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Register() {

  const [userMessage, setUseressage] = useState(null)
  const [errmessage, setErrmessage] = useState(null)
  const [isloading, setIsloading] = useState(false)
  let navigate = useNavigate()


  // function validate(values){
  //   let errors ={}
  //     if(!values.name){
  //       errors.name = "name is required"
  //     }else if(values.name.length < 3){
  //       errors.name = "length must be greater than 3 chars"
  //     }

  //     if (!values.email) {
  //       errors.email = 'email is required';
  //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //       errors.email = 'Invalid email address';
  //     }

  //     if(!values.password){
  //       errors.password = "password is required"
  //     }else if (!/^[A-Z][a-z0-9]{3,8}$/i.test(values.password)) {
  //       errors.password = 'Invalid Password';
  //     }

  //     if(!values.repassword){
  //       errors.repassword = "repassword is required"
  //     }else if (values.repassword !== values.password) {
  //       errors.repassword = 'Password not match';
  //     }

  //     if(!values.phone){
  //       errors.phone = "repassword is required"
  //     }else if (!/^(002)?01[0125][0-9]{8}$/i.test(values.phone)) {
  //       errors.phone = 'Invalid phone';
  //     }




  //   return errors

  // }

  let mySchema = Yup.object({
    name: Yup.string().required("name is required").min(3, "not less than 3 chars").max(18, "not large than 18 chars"),
    email: Yup.string().required("email is required").email("not valid email"),
    password: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,8}$/, "not valid password"),
    rePassword: Yup.string().required("repassword is required").oneOf([Yup.ref("password")]),
    phone: Yup.string().required("phone is required").matches(/^(002)?01[0125][0-9]{8}$/, "not valid repassword"),
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    // validate,
    validationSchema: mySchema,
    onSubmit: (values) => {
      registerFrom(values)
      

    }
  });



  async function registerFrom(values) {
    setIsloading(true)
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((data)=>{
      console.log(data.data.message);
      setUseressage(data.data.message)
      setIsloading(false)
      navigate("/login")
      
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
          <h1 className="text-main text-3xl">Register Now:</h1>
          {userMessage ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
<p>{userMessage}</p>
</div>: null}

{errmessage ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <p>{errmessage}</p>
</div> :null}
          <form onSubmit={formik.handleSubmit}>
            <div className="my-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input name="name" onBlur={formik.handleBlur} type="text" onChange={formik.handleChange} value={formik.values.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              {formik.touched.name && formik.errors.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <p>{formik.errors.name}</p>
            </div> : null}
            </div>
           

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
            </div> : null}
            </div>
            

            <div className="my-2">
  <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword</label>
  <input name="rePassword" onBlur={formik.handleBlur}  type="password" onChange={formik.handleChange} value={formik.values.rePassword} id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  {formik.touched.rePassword && formik.errors.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <p>{formik.errors.rePassword}</p>
            </div> : null}
</div>
            

            <div className="my-2">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
              <input name="phone" onBlur={formik.handleBlur} type="tel" onChange={formik.handleChange} value={formik.values.phone} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              {formik.touched.phone && formik.errors.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <p>{formik.errors.phone}</p>
            </div> : null}
            </div>
         

            {isloading ?<div className="my-4 text-end">
              <button type='submit' className="bg-main text-white px-4 py-2 rounded-lg">
                <i className="fa fa-spinner"></i>
              </button>
            </div> : <div className="my-4 text-end">
              <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="bg-main text-white px-4 py-2 rounded-lg">Register</button>
            </div>}


            
            
          </form>
        </div>
      </div>
    </>



  )
}
