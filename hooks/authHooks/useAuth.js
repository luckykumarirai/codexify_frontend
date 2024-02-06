import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/reducers/authSlice";
import { setToken, setUser } from "../../redux/reducers/userSlice";
import axios from "axios";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import { api } from "../../utils/backendUrl";
import { useState } from "react";
import { useRouter } from "next/router";

function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const login = (email, password) => {
    axios
      .post(api + "/login", {
        email,
        password,
      })
      .then((response) => {
        alert(response?.data?.message);
        if (response.status == 200) {
          if (response?.data?.token) {
            Cookie.set("token", response?.data?.token);
            var decoded = jwt.decode(response.data.token);
            dispatch(setToken(response.data.token));
            dispatch(
              setUser({
                userId: decoded?.userId,
                userName: decoded?.userName,
                firstName: decoded?.firstName,
                lastName: decoded?.lastName,
              })
            );
            dispatch(closeModal());
          } else {
            setError(true);
          }
        } else {
          setError(true);
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const register = (
    firstName,
    lastName,
    userName,
    email,
    password,
    confirmPassword
  ) => {
    if (password == confirmPassword) {
      axios
        .post(api + "/register", {
          firstName,
          lastName,
          userName,
          email,
          password,
        })
        .then(function (response) {
          alert(response?.data?.message);
          if (response.status == 200) {
            if (response?.data?.token) {
              Cookie.set("token", response?.data?.token);
              var decoded = jwt.decode(response.data.token);
              dispatch(setToken(response.data.token));
              dispatch(
                setUser({
                  userId: decoded?.userId,
                  userName: decoded?.userName,
                  firstName: decoded?.firstName,
                  lastName: decoded?.lastName,
                })
              );
              dispatch(closeModal());
            } else {
              setError(true);
            }
          } else {
            setError(true);
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Your Password and Confirm Password are not same.");
      setError(true);
    }
  };

  const logout = () => {
    Cookie.remove("token", {
      expires: new Date(0),
    });
    dispatch(setToken());
    dispatch(setUser());
    router.push("/");
  };

  return { register, login, logout };
}

export default useAuth;
