import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthHeader from "../AuthLayout/AuthHeader";

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
    validationSchema: mySchema,
    onSubmit: (values) => {
      forgotForm(values);
    },
  });

  async function forgotForm(values) {
    setIsloading(true);
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then((data) => {
  sessionStorage.setItem("resetEmail", values.email);
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
      <AuthHeader
        eyebrow="Account recovery"
        title={
          <>
            Forgot your <br /> password?
          </>
        }
        description="Enter the email linked to your account and we'll send you a code to reset your password."
      />

      {userMessage && (
        <div
          className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800"
          role="alert"
        >
          {userMessage}
        </div>
      )}

      {errmessage && (
        <div
          className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800"
          role="alert"
        >
          {errmessage}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
          >
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="h-14 rounded-lg border-stone-300 bg-[#fbf8f3] px-5 text-base"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isloading || !(formik.isValid && formik.dirty)}
          className="h-14 w-full rounded-lg bg-emerald-950 text-base font-semibold text-white hover:bg-emerald-900"
        >
          {isloading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Send reset code"
          )}
        </Button>

        <div className="pt-2 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 font-semibold text-rose-400 hover:underline"
          >
            <ArrowLeft size={16} /> Back to sign in
          </Link>
        </div>
      </form>
    </>
  );
}