import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/reducers/authSlice";
import SocialAuth from "./socialAuth";
import useAuth from "../../hooks/authHooks/useAuth";

export default function Register() {
  const { register } = useAuth();

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <div className="px-6 py-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium text-gray-900">
          Create Your Account
        </h3>
        <div className="space-y-2" action="#">
          <div className="flex justify-between space-x-4">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                name="firstName"
                id="FirstName"
                className="border-gray-300 text-gray-900 bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Jone"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                name="lastName"
                id="LastName"
                className="border-gray-300 text-gray-900 bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your UserName
            </label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              type="text"
              name="userName"
              id="UserName"
              className="border-gray-300 text-gray-900 bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="user123"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              id="email"
              className="border-gray-300 text-gray-900 bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@company.com"
            />
          </div>
          <div className="flex justify-between space-x-4">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="border-gray-300 text-gray-900 bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                id="ConfirmPassword"
                placeholder="••••••••"
                className="border-gray-300 text-gray-900 bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {confirmPassword && password != confirmPassword ? (
                <p className="text-red-500 text-sm">Password do not Match</p>
              ) : null}
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            register(
              firstName,
              lastName,
              userName,
              email,
              password,
              confirmPassword
            )
          }
          type="submit"
          className="w-full text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Create account
        </button>
        <p className="flex justify-center">or</p>
        <SocialAuth type="register" />
        <div className="text-sm font-medium text-gray-500 flex justify-center">
          Already registered?{" "}
          <a
            onClick={() => dispatch(doLogin())}
            className="text-blue-700 hover:underline ml-1 cursor-pointer"
          >
            Log in
          </a>
        </div>
      </div>
    </>
  );
}
