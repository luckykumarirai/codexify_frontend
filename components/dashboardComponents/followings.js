import { useEffect, useState } from "react";
import FollowersCard from "../card/followersCard";
import UserCard from "../card/userCard";
import axios from "axios";
import { api } from "../../utils/backendUrl";
import { useSelector } from "react-redux";

const Followings = () => {
  const userVar = useSelector((state) => state.user.userVar);

  const [data, setData] = useState();

  useEffect(() => {
    function getFollwers() {
      axios
        .get(api + `/getfollowing/${userVar?.userId}`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setData(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getFollwers();
  }, [userVar?.userId]);

  return (
    <>
      <p className="text-xl font-bold mb-4">Followers</p>
      <div className="flex flex-row flex-wrap gap-4 ">
        {data &&
          data.map((item, index) => (
            <FollowersCard
              key={index}
              userName={item.userName}
              firstName={item.firstName}
              lastName={item.lastName}
            />
          ))}
      </div>
    </>
  );
};
export default Followings;
