import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { api } from "./backendUrl";

function UserDetails(props) {
  const [userData, setUserData] = useState(null);
  const { userId } = props;

  useEffect(() => {
    const token = Cookie.get("token");
    // console.log(token);
    axios
      .get(api + `/userById/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log(response);
          setUserData(response.data[0].userName);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return <span>{userData}</span>;
}

export default UserDetails;
