import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../utils/backendUrl";
import { useSelector, useDispatch } from "react-redux";
import { verifyAuthentication } from "../../utils/verify";
import AuthModal from "../auth/modal";
import { doLogin } from "../../redux/reducers/authSlice";

export default function CommentForm({ postId, parentId, postTitle }) {
  const dispatch = useDispatch();

  const tokenVar = useSelector((state) => state.user.tokenVar);
  const userVar = useSelector((state) => state.user.userVar);
  const authVar = useSelector((state) => state.auth.authVar);

  const [text, setText] = useState("");
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (userVar?.userId) {
      setUserId(userVar?.userId);
      setUserName(userVar?.userName);
    }
  }, [userVar]);

  const HandleComment = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${tokenVar}`,
      },
    };
    const bodyParameters = {
      userId,
      userName,
      postId,
      text,
      isRoot: true,
      postTitle: postTitle,
    };

    axios
      .post(api + "/comment", bodyParameters, config)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setText("");
        } else {
          alert("Something went wrong!!");
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const HandleReply = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${tokenVar}`,
      },
    };
    const bodyParameters = {
      userId,
      userName,
      postId: postId,
      text,
      isRoot: false,
      parentId: parentId,
      postTitle: postTitle,
    };

    axios
      .post(api + "/comment", bodyParameters, config)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
        } else {
          alert("Something went wrong!!");
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAuthentication = () => {
    const auth = verifyAuthentication(tokenVar);
    if (auth == 0) {
      dispatch(doLogin());
    }
    console.log(auth);
  };
  return (
    <>
      <div className="ml-auto mr-auto w-11/12 mt-10 mb-10">
        <div className="flex lg:flex-row flex-col lg:space-x-7 spaxe-x-0">
          <textarea
            value={text}
            rows="1"
            className="block p-2.5 w-5/6 lg:w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the Comments"
            onClick={() => handleAuthentication()}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="mt-auto mb-auto">
            {parentId !== undefined ? (
              <button
                type="submit"
                onClick={HandleReply}
                className="flex lg:mt-0 mt-4 text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm  px-5 py-3 text-center font-bold"
              >
                Reply
                <span className="mt-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-send"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />{" "}
                  </svg>
                </span>
              </button>
            ) : (
              <button
                type="submit"
                onClick={HandleComment}
                className="flex lg:mt-0 mt-4 text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm  px-5 py-3 text-center"
              >
                Comment
                <span className="mt-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-send"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />{" "}
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
