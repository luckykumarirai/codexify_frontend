import { useEffect, useState } from "react";
import FollowersCard from "../card/followersCard";
import UserCard from "../card/userCard";
import axios from "axios";
import { api } from "../../utils/backendUrl";
import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import Link from "next/link";
import Dateformat from "../../utils/dateformat";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import DecisionDialog from "../modals/decisionDialog";

const Bookmarks = () => {
  const userVar = useSelector((state) => state.user.userVar);

  const [data, setData] = useState();

  useEffect(() => {
    function getBookmarks() {
      axios
        .get(api + `/getBookmaredPostDetails/${userVar?.userId}`)
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
    getBookmarks();
  }, [userVar?.userId]);

  const getBookmarks = () => {
    axios
      .get(api + `/getBookmarkPost/${userVar?.userId}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setBookmarks(response.data[0].bookmarkPost);
          console.log("===", response.data[0].bookmarkPost);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnBookmark = (postUrl) => {
    const auth = verifyAuthentication(token);
    if (auth == 0) {
      dispatch(doLogin());
    } else {
      axios
        .post(api + `/removeBookmarkPost/${userVar?.userId}`, {
          postUrl: postUrl,
        })
        .then((response) => {
          if (response.status === 200) {
            getBookmarks();
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <p className="text-xl font-bold mb-4">Bookamarks</p>
      {data ? (
        <>
          {data?.map((item, index) => (
            <div key={index}>
              <div className="w-full rounded shadow-sm border p-4 bg-white flex mb-4 justify-between">
                <div className="md:pl-4 pl-0">
                  <Link href={"/post/" + item.postUrl}>
                    <div className="font-bold text-2xl">{item.title}</div>
                  </Link>
                  <div className="text-gray-600 text-xs">
                    <span className="font-bold">Posted:</span>
                    <Dateformat timestamp={item.createdAt} />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => handleUnBookmark(item.postUrl)}
                    //className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-bookmark-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
    </>
  );
};

export default Bookmarks;
