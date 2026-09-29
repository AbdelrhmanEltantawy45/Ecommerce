

// import React from 'react'
import React, { useContext, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import { TokenContext } from "../../Context/TokenContext";
import { Link } from "react-router-dom";

export default function VerifyCode() {

  const [userMessage, setUseressage] = useState(null);
  const [errmessage, setErrmessage] = useState(null);
  const [isloading, setIsloading] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
    code: Yup.string()
   
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    // validate,
    validationSchema: mySchema,
    onSubmit: (values) => {
      verifyForm(values);
    },
  });

  async function verifyForm(values) {
    setIsloading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      .then((data) => {
        setUseressage(data.data.message);

        setIsloading(false);
        navigate("/forgotpassword/verifycode/resetpassword");
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
          <h1 className="text-main text-3xl">Verify Code:</h1>
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
                htmlFor="resetCode"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Code
              </label>
              <input
                name="resetCode"
                onBlur={formik.handleBlur}
                type="text"
                onChange={formik.handleChange}
                value={formik.values.resetCode}
                id="resetCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.resetCode && formik.errors.resetCode ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <p>{formik.errors.resetCode}</p>
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
