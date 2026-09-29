// import React from 'react'
import React, { useContext, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";


export default function Forgotpassword() {

  const [userMessage, setUseressage] = useState(null);
  const [errmessage, setErrmessage] = useState(null);
  const [isloading, setIsloading] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
    email: Yup.string().required("email is required").email("not valid email"),
   
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    // validate,
    validationSchema: mySchema,
    onSubmit: (values) => {
      forgotForm(values);
    },
  });

  async function forgotForm(values) {
    setIsloading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
      .then((data) => {
        console.log("datattatat" , data);
        setUseressage(data.data.message);

        setIsloading(false);
        navigate("/forgotpassword/verifycode");
      })
      .catch((err) => {
        setErrmessage(err.response.data.message);
        setIsloading(false);
      }); 
  }
  return (
    <>
      &lt;&gt;
      <div className="container w-1/2 mx-auto">
        <div className=" mx-auto">
          <h1 className="text-main text-3xl">Forgot Password:</h1>
          {userMessage ? (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <p>{userMessage}</p>
            </div>
          ) : null}

          {errmessage ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <p>{errmessage}</p>
            </div>
          ) : null}
          <form onSubmit={formik.handleSubmit}>
            <div className="my-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                name="email"
                onBlur={formik.handleBlur}
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.email && formik.errors.email ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
            </div>

          

           

            {isloading ? (
              <div className="my-4 text-end">
                <button
                  type="submit"
                  className="bg-main text-white px-4 py-2 rounded-lg"
                >
                  <i className="fa fa-spinner"></i>
                </button>
              </div>
            ) : (
              <div className="my-4 text-end">
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="bg-main text-white px-4 py-2 rounded-lg"
                >
                  Next
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
