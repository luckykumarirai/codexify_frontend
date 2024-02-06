import { useState, useEffect } from "react";
import AuthModal from "../auth/modal";
import { useSelector, useDispatch } from "react-redux";
import { doLogin, doRegister } from "../../redux/reducers/authSlice";
import { setToken, setUser } from "../../redux/reducers/userSlice";
import Cookie from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import CreateAccountCard from "../card/createAcoountCard";
import useAuth from "../../hooks/authHooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const [toggle, setToggle] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const authVar = useSelector((state) => state.auth.authVar);
  const userVar = useSelector((state) => state.user.userVar);
  const tokenVar = useSelector((state) => state.user.tokenVar);

  useEffect(() => {
    if (tokenVar) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [tokenVar]);

  return (
    <>
      <nav className="bg-white px-2 sm:px-4 py-1 w-full z-20 top-0 left-0 border-b border-gray-200 shadow fixed">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link href="/" className="flex items-center px-1">
            <Image src="/logo.png" width="50" height="50" alt="Logo" />
            <span className="self-center text-2xl font-bold whitespace-nowrap">
              Codex
            </span>
          </Link>
          <div className="flex lg:order-2">
            <button className="flex items-center">
              <Image
                src="/search.svg"
                width="25"
                height="25"
                alt="Search Logo"
                className="mr-4"
              />
            </button>
            {!isLogin ? (
              <div className="flex px-4">
                <button
                  type="button"
                  onClick={() => dispatch(doLogin())}
                  className="text-blue-700 hover:text-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-medium px-3 py-2 text-center mr-0 lg:mr-2"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(doRegister())}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-3 py-2 text-center mr-0 lg:mr-0 hidden lg:block"
                >
                  Get started
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link href="/newPost">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-0 lg:mr-4 lg:ml-2 hidden lg:block"
                  >
                    Write New Post
                  </button>
                  <button
                    type="button"
                    className="text-xl rounded-lg px-3 py-2 text-center mr-2 lg:mr-4 lg:ml-2 lg:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      width="24"
                      height="24"
                    >
                      <path d="M18.364 3.636a2 2 0 0 0-2.828 0l-10.92 10.92-1.454 6.364 6.364-1.454 10.92-10.92a2 2 0 0 0 0-2.828z"></path>
                      <path d="M15 9l-1 1"></path>
                    </svg>
                  </button>
                </Link>
                <div className="group relative">
                  <button
                    type="button"
                    className="flex mr-1 text-sm bg-gray-800 rounded-full lg:mr-0 focus:ring-4 focus:ring-gray-300"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      width="35"
                      height="35"
                      src="/user.svg"
                      alt="user photo"
                    />
                  </button>
                  <div className="hidden group-hover:block transition duration-300 delay-150  group-hover:delay-300 absolute right-0 text-base list-none bg-white divide-y divide-gray-100 rounded shadow z-10">
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900">
                        {userVar?.firstName}
                      </span>
                      <span className="block text-sm font-medium text-gray-500 truncate">
                        @{userVar?.userName}
                      </span>
                    </div>
                    <ul className="py-1" aria-labelledby="user-menu-button">
                      <li>
                        <Link
                          href="/dashboard/"
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => logout()}
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={
              (toggle ? "block " : "hidden ") +
              "items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
            }
          >
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium lg:border-0 lg:bg-white">
              <li onClick={() => setToggle(false)}>
                <Link
                  href="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0"
                >
                  Home
                </Link>
              </li>
              <li onClick={() => setToggle(false)}>
                <Link
                  href="/about"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0"
                >
                  About
                </Link>
              </li>
              <li onClick={() => setToggle(false)}>
                <Link
                  href="/service"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0"
                >
                  Services
                </Link>
              </li>
              <li onClick={() => setToggle(false)}>
                <Link
                  href="/contact"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {authVar ? <AuthModal /> : null}
    </>
  );
}
