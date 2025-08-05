"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import Button from "../UI/Button";
import Link from "next/link";
import { registerSchema } from "../../lib/validationSchema/schemas";
import { useToaster } from "@/app/context/ToasterContext";
import { register } from "@/app/services/authService";

function RegisterForm() {
  const { showToast } = useToaster();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      confirm_Password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { resetForm }) => {
      const { confirm_Password, ...sanitizedValues } = values;
      try {
        setIsLoading(true);
        const data = await register(sanitizedValues);
        showToast(data?.message, "success");
      } catch (error: any) {
        showToast(error?.response?.data?.message, "error");
      } finally {
        setIsLoading(false);
        resetForm();
      }
    },
  });

  const handleSubmitWithToast = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => {
        showToast(msg as string, "error");
      });
    } else {
      formik.handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmitWithToast}
      className="w-full max-w-xs sm:max-w-xs lg:max-w-sm xl:max-w-md mx-auto px-4"
    >
      <div className="relative my-4">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          className={`bg-gray-50 border border-gray-300 placeholder-gray-400 font-thin rounded-lg text-gray-900 text-[1.25rem] w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none ${
            formik.touched.name && formik.errors.name
              ? "border-red-500 border-2"
              : "border-gray-300"
          }`}
          placeholder="Your Name*"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
      </div>
      <div className="relative my-4">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
          </svg>
        </div>
        <input
          type="email"
          id="email"
          name="email"
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-[1.25rem] placeholder-gray-400 font-thin rounded-lg w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none ${
            formik.touched.email && formik.errors.email
              ? "border-red-500 border-2"
              : "border-gray-300"
          }`}
          placeholder="Your Email*"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </div>

      <div className="relative my-4">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M6 10V8a6 6 0 1112 0v2h1a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V11a1 1 0 011-1h1zm2-2a4 4 0 118 0v2H8V8zm4 4a2 2 0 100 4 2 2 0 000-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          className={`bg-gray-50 border text-gray-900 text-[1.25rem] placeholder-gray-400 font-thin rounded-lg w-full ps-10 pe-10 p-2.5 dark:bg-gray-700 focus:outline-none ${
            formik.touched.password && formik.errors.password
              ? "border-red-500 border-2"
              : "border-gray-300"
          }`}
          placeholder="Your Password*"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-600"
        >
          {showPassword ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.33.26-2.597.738-3.738M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c1.4 0 2.732.307 3.94.858M19.5 12.5c-1.087 2.735-3.738 4.5-6.5 4.5a7.978 7.978 0 01-5.94-2.64"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M6 10V8a6 6 0 1112 0v2h1a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V11a1 1 0 011-1h1zm2-2a4 4 0 118 0v2H8V8zm4 4a2 2 0 100 4 2 2 0 000-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirm_Password"
          name="confirm_Password"
          className={`bg-gray-50 border text-gray-900 text-[1.25rem] placeholder-gray-400 font-thin rounded-lg w-full ps-10 pe-10 p-2.5 dark:bg-gray-700 focus:outline-none ${
            formik.touched.confirm_Password && formik.errors.confirm_Password
              ? "border-red-500 border-2"
              : "border-gray-300"
          }`}
          placeholder="Confirm Password*"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirm_Password}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-600"
        >
          {showConfirmPassword ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.33.26-2.597.738-3.738M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c1.4 0 2.732.307 3.94.858M19.5 12.5c-1.087 2.735-3.738 4.5-6.5 4.5a7.978 7.978 0 01-5.94-2.64"
              />
            </svg>
          )}
        </button>
      </div>

      <Button
        label="Sign Up"
        type="submit"
        className="rounded-full w-full bg-[#0f5ef7] px-4 py-3 mt-5 text-white"
        isLoading={isLoading}
        loadingText="Sign Up"
        icon=""
      />

      <Link
        href="/login"
        className="block text-center mt-4 text-gray-500 hover:underline"
      >
        Have an account? Login
      </Link>
    </form>
  );
}

export default RegisterForm;
