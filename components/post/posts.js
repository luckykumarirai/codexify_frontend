import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Link from "next/link";
import Dateformat from "../../utils/dateformat";
import { api } from "../../utils/backendUrl";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import { generateRandomColorCode } from "../../utils/generateRandomColor";
import Button from "../card/iconbutton";
import { verifyAuthentication } from "../../utils/verify";
import Title from "../layout/title";

export default function Posts() {
  const token = useSelector((state) => state.user.tokenVar);
  const userVar = useSelector((state) => state.user.userVar);

  const [data, setData] = useState();
  const [bookmarks, setBookmarks] = useState();

  useEffect(() => {
    axios
      .get(api + "/posts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          //console.log(response);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

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

  useEffect(() => {
    if (userVar && userVar?.userId) {
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
    }
  }, [userVar]);

  const handleBookmark = (postUrl) => {
    const auth = verifyAuthentication(token);
    if (auth == 0) {
      dispatch(doLogin());
    } else {
      axios
        .post(api + `/bookmarkPost/${userVar?.userId}`, {
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

  const handleLatestPost = () => {
    axios
      .get(api + `/getLatestPost`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePopularPost = () => {
    axios
      .get(api + `/getPopularPost`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {data ? (
        <>
          <Title
            title={data[0]?.title}
            description="Codex|Blogs|Learn & Grow"
          />
          <div className="flex justify-start lg:justify-end space-x-3 mb-1">
            <button
              type="button"
              onClick={() => handleLatestPost()}
              className="text-slate-600 hover:text-blue-800 font-bold hover:bg-white rounded-lg px-2 py-2.5 text-center text-md lg:block"
            >
              Latest
            </button>
            <button
              type="button"
              onClick={() => handleLatestPost()}
              className="text-slate-600 hover:text-blue-800 font-bold hover:bg-white rounded-lg px-2 py-2.5 text-center text-md lg:block"
            >
              Trending
            </button>
            <button
              type="button"
              onClick={() => handlePopularPost()}
              className="text-slate-600 hover:text-blue-800 font-bold hover:bg-white rounded-lg px-2 py-2.5 text-center text-md lg:block"
            >
              Popular
            </button>
          </div>
          {data.map((item) => (
            <>
              <div className="bg-white mb-6 rounded shadow-lg overflow-hidden border hover:drop-shadow-xl hover:shadow-blue-200">
                <div className="px-4 py-4 flex space-x-3">
                  <Image
                    width="30"
                    height="30"
                    src="/user.svg"
                    alt="user photo"
                  />
                  <div className="text-gray-600 text-xs flex-col">
                    <p className="font-semibold">{item.userName}</p>
                    <Dateformat timestamp={item.createdAt} />
                  </div>
                </div>
                {item.posterImage ? (
                  <Image
                    src={item.posterImage}
                    alt="Poster Image"
                    width="400"
                    height="300"
                    layout="responsive"
                    className="flex justify-center max-h-60 w-full object-cover px-14 mb-4"
                  />
                ) : null}
                <Link href={"/post/" + item.postUrl}>
                  <div className="px-4 lg:px-14">
                    <h1 className="font-bold text-2xl mb-2">{item.title}</h1>
                  </div>
                </Link>
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:px-12 px-4 pt-4 pb-2">
                    {item.tag.length > 0 ? (
                      item.tag.map((tags, index) => {
                        const color = generateRandomColorCode();
                        return (
                          <>
                            <span
                              key={index}
                              className={`shadow-lg inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-${color}-100 border border-${color}-400`}
                            >
                              <span className={`text-${color}-900`}>#</span>
                              {tags}
                            </span>
                          </>
                        );
                      })
                    ) : (
                      <>
                        <span className="shadow-lg inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-cyan-100	 border border-cyan-400">
                          #technology
                        </span>
                        <span className="shadow-lg inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-green-100 border border-green-400">
                          #codex
                        </span>
                        <span className="shadow-lg inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-purple-100 border border-purple-400">
                          #unique
                        </span>
                      </>
                    )}
                  </div>
                  {bookmarks?.includes(item.postUrl) ? (
                    <div className="lg:pt-6 lg:pb-0 pb-2 pt-0 lg:px-0 px-4 lg:ml-auto ml-0 lg:mr-8 mr-0">
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
                  ) : (
                    <div className="lg:pt-6 lg:pb-0 pb-2 pt-0 lg:px-0 px-4 lg:ml-auto ml-0 lg:mr-8 mr-0">
                      <button
                        type="button"
                        onClick={() => handleBookmark(item.postUrl)}
                        //className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-bookmark hover:border-2 hover:bg-purple-100"
                          viewBox="0 0 16 16"
                        >
                          {" "}
                          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />{" "}
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div></div>
            </>
          ))}
        </>
      ) : (
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperclassName=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
    </>
  );
}
