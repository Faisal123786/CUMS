"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaUserShield, FaUser, FaUserSecret } from "react-icons/fa";
import Button from "../UI/Button";
import { useToaster } from "@/app/context/ToasterContext";
import { loginSchema } from "@/app/lib/validationSchema/schemas";
import { login } from "@/app/services/authService";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

function LoginForm() {
  const router = useRouter();
  const { showToast } = useToaster();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState("Donor");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const activated = searchParams.get("activated");
    if (activated === "true") {
      showToast("Account activated successfully!", "success");
    } else if (activated === "false") {
      showToast("Activation failed. Something went wrong.", "error");
    } else if (activated === "error") {
      showToast("Something went wrong.", "error");
    } else if (activated === "expired") {
      showToast("Link Expired Try Again.", "error");
    }
  }, [searchParams]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const finalValues = {
          ...values,
          role: selectedRole,
        };
        const data = await login(finalValues);
        console.log(data?.user);
        dispatch(setUser(data?.user));
        showToast(data?.message, "success");
        router.push("/dashboard");
      } catch (error: any) {
        showToast(error?.response?.data?.message, "error");
      } finally {
        setIsLoading(false);
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

  const roles = ["Donor", "Admin", "Employee"];

  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-md">
      <div className="text-center mb-6">
        <strong className="block text-lg font-semibold text-gray-500">
          I am
        </strong>
      </div>

      <ul className="flex justify-center items-center gap-2 mb-6">
        {roles.map((role) => (
          <li key={role}>
            <button
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`rounded-full border border-gray-400 h-[85px] w-[85px] flex flex-col items-center justify-center text-sm font-thin transition-all duration-300 ${
                selectedRole === role
                  ? "bg-[#039be5] text-white scale-105 shadow-lg"
                  : "bg-white text-gray-400 hover:bg-gray-100"
              }`}
            >
              {role === "Admin" && <FaUserShield size={40} className="mb-1" />}
              {role === "Employee" && <FaUser size={40} className="mb-1" />}
              {role === "Donor" && <FaUserSecret size={40} className="mb-1" />}
              <span>{role}</span>
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmitWithToast} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email*"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`w-full ps-10 p-2.5 border rounded-lg text-[1.25rem] font-thin bg-blue-100 focus:outline-none
              ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
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
            type="password"
            name="password"
            id="password"
            placeholder="Your Password*"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={`w-full ps-10 p-2.5 border rounded-lg text-[1.25rem] font-thin bg-blue-100 focus:outline-none
              ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
          />
        </div>

        <Button
          label="Sign In"
          type="submit"
          className="rounded-full w-fit bg-[#039be5] px-10 py-3 pt-2 m-auto flex justify-center text-white"
          isLoading={isLoading}
          loadingText="Sign In"
          icon=""
        />

        <Link
          href="/forgot-password"
          className="block text-center mt-4 text-gray-500 hover:underline"
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
