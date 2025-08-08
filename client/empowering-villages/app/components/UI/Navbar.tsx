"use client";
import { FaBars } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider";
import { logout } from "@/app/services/authService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFullscreen } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { logoutUser, setUser } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  role: string;
  exp?: number;
  iat?: number;
}
export default function Navbar() {
  const { setIsSidebarCollapsed } = useTheme();
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const data = jwtDecode<DecodedToken>(token);
        dispatch(setUser(data));
      } catch (error) {
        console.error("Invalid token", error);
        dispatch(logoutUser());
      }
    }
  }, [dispatch]);

  const logoutHandler = async () => {
    await logout();
    dispatch(logoutUser());
    router.replace("/login");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <header className="h-16 bg-[#364049] border-b shadow flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Image
          src="https://eskooly.com/bb/assets/images/logo.png"
          alt="Logo"
          width={100}
          height={100}
        />

        <button
          className="text-xl md:hidden text-gray-300 ml-9"
          onClick={() => setIsSidebarCollapsed((prev: boolean) => !prev)}
        >
          <FaBars />
        </button>

        <button
          className="text-sm text-gray-300 ml-9"
          onClick={toggleFullscreen}
        >
          <BsFullscreen className="text-[20px]" />
        </button>
      </div>

      <div className="flex items-center gap-5">
        <div>
          <FaMessage className="text-[20px] text-gray-300" />
        </div>
        <div>
          <IoIosNotifications className="text-[30px] text-gray-300" />
        </div>
        <div className="relative">
          <img
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-10 h-10 rounded-full cursor-pointer"
            src="https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg"
            alt="User avatar"
          />

          {dropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Faisal Rehman</div>
                <div className="font-medium truncate">
                  faisalurr859@gmail.com
                </div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Account Setting
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <button
                  onClick={logoutHandler}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
