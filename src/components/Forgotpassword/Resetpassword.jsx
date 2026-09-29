import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Resetpassword() {
  const [userMessage, setUseressage] = useState(null);
  const [errmessage, setErrmessage] = useState(null);
  const [isloading, setIsloading] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
    email: Yup.string().required("email is required").email("not valid email"),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "not valid password"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    // validate,
    validationSchema: mySchema,
    onSubmit: (values) => {
      resetForm(values);
    },
  });

  async function resetForm(values) {
    setIsloading(true);
    return await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((data) => {
        console.log(data.data.message);
        setUseressage(data.data.message);
        setIsloading(false);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrmessage(err.response.data.message);
        setIsloading(false);
      });
  }

  return (
    <>
      &lt;&gt;
      <div className="container w-1/2 mx-auto">
        <div className=" mx-auto">
          <h1 className="text-main text-3xl">Reset Password:</h1>
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

            <div className="my-2">
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                name="newPassword"
                onBlur={formik.handleBlur}
                type="password"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                id="newPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <p>{formik.errors.newPassword}</p>
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
                  disabled={!(formik.isValid &&  formik.dirty)}
                  type="submit"
                  className="bg-main text-white px-4 py-2 rounded-lg"
                >
                  Reset Password
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
