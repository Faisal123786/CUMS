import RegisterForm from "@/app/components/client/RegisterForm";
import TextChanger from "@/app/components/TextChanger";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function RegisterPage() {
  return (
    <div className="w-full h-screen overflow-auto">
      <table className="table-auto w-full h-full border-collapse">
        <tbody className="block lg:table w-full h-full">
          <tr className="block lg:table-row w-full h-full">
            <td className="block lg:table-cell bg-[#061D48] text-white w-full lg:w-1/3 align-top">
              <div className="flex flex-col h-full px-6 py-10">
                <div className="text-center mb-6">
                  <Image
                    className="mx-auto"
                    src="https://eskooly.com/assets/images/logos/logoxx.png"
                    alt="Logo"
                    width={100}
                    height={100}
                  />
                  <h1 className="font-bold text-lg mt-4">
                    Register Your Account
                  </h1>
                </div>

                <div className="flex-grow flex items-center justify-center">
                  <RegisterForm />
                </div>
              </div>
            </td>

            <td className="block lg:table-cell bg-white dark:bg-gray-900 w-full lg:w-2/3 p-6 align-top">
              <div className="flex justify-end mb-6">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Already have an account?
                  <Link
                    href="/login"
                    className="text-white bg-[#0f5ef7] px-8 py-3 pt-2 rounded-full ml-3 inline-block"
                  >
                    Login
                  </Link>
                </span>
              </div>

              <div className="flex justify-center items-center h-full mt-10">
                <div className="text-center w-full max-w-2xl">
                  <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl ">
                    Start managing <span className="text-[#0f5ef7]">free</span>{" "}
                    now!
                  </h1>
                  <div className="my-10">
                  <TextChanger />
                  </div>
                  <div className="hidden md:block mt-6">
                    <Image
                      src="https://eskooly.com/assets/images/illustrations/mockups/landing3/signup1.png"
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
