import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthHeader from "../AuthLayout/AuthHeader";

export default function Resetpassword() {
  const [userMessage, setUseressage] = useState(null);
  const [errmessage, setErrmessage] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      <AuthHeader
        eyebrow="Account recovery"
        title={
          <>
            Set a new <br /> password
          </>
        }
        description="Confirm your email and choose a new password to get back into your account."
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
        {/* Email */}
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

        {/* New password */}
        <div className="space-y-2">
          <Label
            htmlFor="newPassword"
            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
          >
            New password
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              className="h-14 rounded-lg border-stone-300 bg-[#fbf8f3] px-5 pr-12 text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-sm text-red-600">{formik.errors.newPassword}</p>
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
            "Reset password"
          )}
        </Button>
      </form>
    </>
  );
}