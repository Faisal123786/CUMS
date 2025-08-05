import LoginForm from "@/app/components/client/LoginForm";
import RegisterForm from "@/app/components/client/RegisterForm";
import TextChanger from "@/app/components/TextChanger";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuMessageCircleWarning } from "react-icons/lu";

function RegisterPage() {
  return (
    <div className="w-full h-screen overflow-auto">
      <table className="table-auto w-full h-full border-collapse">
        <tbody className="block lg:table w-full h-full">
          <tr className="block lg:table-row w-full h-full">
            <td className="block lg:table-cell bg-white dark:bg-gray-900 w-full lg:w-7/12 p-6 align-top">
              <div className="flex flex-col h-full px-6 py-10 w-8/12 m-auto  justify-center">
                <div className="text-center mb-6">
                  <Image
                    className="mx-auto"
                    src="https://eskooly.com/bb/asserts/images/logos/eskooly.png"
                    alt="Logo"
                    width={150}
                    height={150}
                  />
                  <Link
                    href="/register"
                    className="flex justify-center items-center  mt-4 font-semibold text-gray-400 hover:text-[#039BE5]"
                  >
                    <LuMessageCircleWarning /> I do not have an account yet
                  </Link>
                </div>

                <div className=" flex items-center justify-center px-4 py-8 pt-0">
                  <LoginForm />
                </div>
              </div>
            </td>

            <td className="block lg:table-cell bg-[#039BE5] text-white w-full lg:w-9/12 align-top">
              <div className="flex justify-center items-center h-full py-12">
                <div className="text-center w-full max-w-2xl">
                  <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl">
                    Start managing now!
                  </h1>
                  <p className="w-10/12 m-auto my-5">
                    Stop struggling with common tasks and focus on the real
                    choke points. Discover a full featured & 100% Free School
                    management platform.
                  </p>
                  <Link
                    href="/login"
                    className="text-white bg-inherit border-2 border-white px-10 py-2.5 rounded-full hover:bg-white hover:text-black inline-block"
                  >
                    Get started
                  </Link>
                  <div className="hidden md:block mt-6">
                    <Image
                      src="https://eskooly.com/bb/asserts/images/illustrations/drawings/login4.png"
                      alt="Signup Illustration"
                      width={800}
                      height={800}
                      className="w-full max-w-[700px] h-auto mx-auto"
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RegisterPage;
