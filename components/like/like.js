import React from "react";
import axios from "axios";
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { SlLike } from "react-icons/sl";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoBookmarksOutline } from "react-icons/io";
import { api } from "../../utils/backendUrl";
import { useSelector, useDispatch } from "react-redux";
import { doLogin } from "../../redux/reducers/authSlice";
import { verifyAuthentication } from "../../utils/verify";

export default function Like({
  isLike,
  postUrl,
  likeCount,
  userId,
  setIsLike,
  setLikeCount,
}) {
  const dispatch = useDispatch();
  const tokenVar = useSelector((state) => state.user.tokenVar);
  const authVar = useSelector((state) => state.auth.authVar);

  const handleLikeClick = (postUrl) => {
    const auth = verifyAuthentication(tokenVar);
    if (auth == 0) {
      dispatch(doLogin());
      console.log(auth);
    } else {
      if (userId) {
        axios
          .post(api + `/like`, {
            userId,
            postUrl,
            likeStatus: true,
          })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              setIsLike(true);
              setLikeCount(likeCount + 1);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleUnLikeClick = (postUrl) => {
    const auth = verifyAuthentication(tokenVar);
    if (auth == 0) {
      dispatch(doLogin());
    } else {
      axios
        .delete(api + `/dislike/${userId}/${postUrl}`)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            setIsLike(false);
            setLikeCount(likeCount - 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleBookmark = (postUrl) => {
    const auth = verifyAuthentication(tokenVar);
    if (auth == 0) {
      dispatch(doLogin());
    } else {
      if (userId) {
        axios
          .post(api + `/`, {
            userId,
            postUrl,
            likeStatus: true,
          })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              setIsLike(true);
              setLikeCount(likeCount + 1);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  function scrollToCommentForm() {
    console.log("comment");
    const commentForm = document.getElementById("comment-form");
    commentForm.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {!isLike ? (
        <>
          <div className="lg:mt-10 mt-0 flex flex-row lg:flex-col justify-center space-x-12 lg:space-x-0">
            <div className="flex lg:flex-col flex-row items-center lg:space-x-0 space-x-2">
              <button
                className="lg:text-5xl text-3xl"
                onClick={() => handleLikeClick(postUrl)}
              >
                <AiOutlineLike />
              </button>
              <p className="flex justify-center lg:text-xl text-base">
                {likeCount}
              </p>
            </div>
            <div className="relative group flex lg:flex-col flex-row items-center lg:space-x-0 space-x-2">
              <button
                className="lg:text-5xl text-3xl"
                onClick={() => scrollToCommentForm()}
              >
                <BiCommentDetail />
              </button>
              <span className="hidden group-hover:block bg-green-100 text-gray-800 px-2 py-1 rounded-md absolute bottom-0 left-0 transform translate-x-1/2 -translate-y-12 text-sm">
                Go to comments
              </span>
              <p className="flex justify-center lg:text-xl text-base">
                {likeCount}
              </p>
            </div>
            <div className="flex lg:flex-col flex-row items-center lg:space-x-0 space-x-2">
              <button
                className="lg:text-5xl text-3xl"
                onClick={() => handleLikeClick(postUrl)}
              >
                <CiBookmarkPlus />
              </button>
              <p className="flex justify-center lg:text-xl text-base">
                {likeCount}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="lg:mt-10 mt-0 flex flex-row lg:flex-col justify-center space-x-12 lg:space-x-0">
            <div className="flex lg:flex-col flex-row items-center lg:space-x-0 space-x-2">
              <button
                className="lg:text-5xl text-3xl"
                onClick={() => handleUnLikeClick(postUrl)}
              >
                <AiFillLike />
              </button>
              <p className="flex justify-center lg:text-xl text-base">
                {likeCount}
              </p>
            </div>
            <div className="flex lg:flex-col flex-row items-center lg:space-x-0 space-x-2">
              <button
                className="lg:text-5xl text-3xl"
                onClick={() => scrollToCommentForm()}
              >
                <BiCommentDetail />
              </button>
              <p className="flex justify-center lg:text-xl text-base">
                {likeCount}
              </p>
            </div>
            <div className="flex lg:flex-col flex-row items-center lg:space-x-0 space-x-2">
              <button
                className="lg:text-5xl text-3xl"
                onClick={() => handleLikeClick(postUrl)}
              >
                <CiBookmarkPlus />
              </button>
              <p className="flex justify-center lg:text-xl text-base">
                {likeCount}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
