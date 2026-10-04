import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { TokenContext } from "../../../app/Context/TokenContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthHeader from "../AuthLayout/AuthHeader";

export default function Login() {
  let { setToken } = useContext(TokenContext);

  const [userMessage, setUseressage] = useState(null);
  const [errmessage, setErrmessage] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  // الصفحة اللي اليوزر كان رايحلها قبل ما يتحوّل للـ login
  const location = useLocation();
  const from = location.state?.from || "/";

  let mySchema = Yup.object({
    email: Yup.string().required("email is required").email("not valid email"),
    password: Yup.string()
      .required("New password is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "not valid password"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      loginFrom(values);
    },
  });

  async function loginFrom(values) {
    setIsloading(true);
    setErrmessage(null);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        localStorage.setItem("userToken", data.data.token);
        setToken(data.data.token);
        setUseressage(data.data.message);

        setIsloading(false);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setErrmessage(err.response?.data?.message || "Something went wrong");
        setIsloading(false);
      });
  }

  return (
    <>
      <AuthHeader
        eyebrow="Private client access"
        title={
          <>
            Welcome back <br /> to the studio
          </>
        }
        description="Access your curated selections, order history, and exclusive early collections."
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

        {/* Password */}
        <div className="space-y-2">
          <div className="flex justify-end">
            <Link
              to="/forgotpassword"
              className="text-xs font-semibold text-rose-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
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
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-600">{formik.errors.password}</p>
          )}
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-3">
          <Checkbox id="remember" />
          <Label
            htmlFor="remember"
            className="cursor-pointer text-base font-normal text-slate-600"
          >
            Remember me
          </Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isloading || !(formik.isValid && formik.dirty)}
          className="h-14 w-full rounded-lg bg-emerald-950 text-base font-semibold text-white hover:bg-emerald-900"
        >
          {isloading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Sign in to Veridian"
          )}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 pt-2">
          <div className="h-px flex-1 bg-stone-300" />
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-stone-300" />
        </div>

        {/* Social buttons (UI فقط) */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-14 rounded-lg border-stone-300 bg-white text-base font-medium"
          >
            <span className="mr-2 font-serif text-lg font-bold">G</span> Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-14 rounded-lg border-stone-300 bg-white text-base font-medium"
          >
            <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-black" />
            Apple
          </Button>
        </div>

        <p className="pt-2 text-center text-slate-600">
          New to the boutique?{" "}
          <Link
            to="/register"
            state={location.state}
            className="font-semibold text-rose-400 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </>
  );
}