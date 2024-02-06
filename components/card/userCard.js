import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { api } from "../../utils/backendUrl";
import { doLogin } from "../../redux/reducers/authSlice";
import { verifyAuthentication } from "../../utils/verify";

const UserCard = ({
  bloggerDetails,
  bloggerUserId,
  followStatus,
  handleFollowStatus,
}) => {
  // console.log(isurblog+"card");
  const dispatch = useDispatch();
  const userVar = useSelector((state) => state.user.userVar);
  const tokenVar = useSelector((state) => state.user?.tokenVar);
  const authVar = useSelector((state) => state.auth?.authVar);
  const [isurblog, setIsurblog] = useState();

  function handleFollow(followUserId) {
    const auth = verifyAuthentication(tokenVar);
    if (auth == 0) {
      dispatch(doLogin());
    } else {
      axios
        .post(api + `/follow/${userVar?.userId}`, {
          followUserId: followUserId,
        })
        .then((response) => {
          if (response.status === 200) {
            handleFollowStatus(true);
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  function handleUnfollow(followUserId) {
    const auth = verifyAuthentication(tokenVar);
    if (auth == 0) {
      dispatch(doLogin());
    } else {
      axios
        .post(api + `/unfollow/${userVar?.userId}`, {
          unfollowUserId: followUserId,
        })
        .then((response) => {
          if (response.status === 200) {
            handleFollowStatus(false);
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <>
      <div className="lg:w-3/4  w-full lg:mt-5 mt-0 ml-auto mr-auto rounded shadow overflow-hidden border lg:px-2 lg:py-2 px-0 py-0 bg-purple-100">
        <div className="flex justify-center ">
          <Image src="/user.svg" alt="user" width="80" height="80" />
        </div>
        <div className="text-center text-lg text-gray-600">
          <p className="text-xl font-bold">
            {bloggerDetails?.firstName + " " + bloggerDetails?.lastName}
          </p>
          <p className="text-xl font-bold">@{bloggerDetails?.userName}</p>
        </div>
        {isurblog ? (
          <button
            type="submit"
            className=" w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2 text-center"
            onClick={() => handleEdit()}
          >
            Edit Profile
          </button>
        ) : (
          <div className="text-center mt-5 mb-5">
            {followStatus ? (
              <button
                type="submit"
                className=" w-full bg-white text-black hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-400 rounded-lg text-md py-2 text-center border "
                onClick={() => handleUnfollow(bloggerUserId)}
              >
                Following
              </button>
            ) : (
              <button
                type="submit"
                className=" w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2 text-center"
                onClick={() => handleFollow(bloggerUserId)}
              >
                Follow
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default UserCard;
