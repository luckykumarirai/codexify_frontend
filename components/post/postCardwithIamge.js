import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Link from "next/link";
import Dateformat from "../../utils/dateformat";
import { api } from "../../utils/backendUrl";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import { generateRandomColorCode } from "../../utils/generateRandomColor";

const PostCardwithImage = () => {
  const token = useSelector((state) => state.user.tokenVar);
  const userVar = useSelector((state) => state.user.userVar);

  const [userId, setUserId] = useState();
  const [data, setData] = useState();
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    if (userVar?.userId) {
      setUserId(userVar?.userId);
    }
  }, [userVar]);

  useEffect(() => {
    const handleResize = () => {
      const cardElement = document.getElementById("card");
      if (cardElement) {
        const height = cardElement.offsetHeight;
        setCardHeight(height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageHeight = cardHeight / 8;

  useEffect(() => {
    axios
      .get(api + "/posts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log(response);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <>
      {data &&
        data.map((item) => (
          <>
            <div
              id="card"
              className="min-w-sm mb-3 rounded shadow overflow-hidden bg-red-200"
            >
              <div className="h-60 bg-green-500">
                <Image
                  className="w-full"
                  src="/l.jpg"
                  width={300}
                  height={100}
                  alt="Sunset in the mountains"
                />
              </div>

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
              <Link href={"/post/" + item.postUrl}>
                <div className="px-4 lg:px-12">
                  <div className="font-bold text-2xl mb-2">{item.title}</div>
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
                            className={`shadow-lg inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-${color}-100 border hover:border-${color}-400`}
                          >
                            <span className={`text-${color}-900`}>#</span>
                            {tags}
                          </span>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <span className="shadow-lg inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-cyan-100	 border hover:border-cyan-400">
                        #technology
                      </span>
                      <span className="shadow-lg inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-green-100 border hover:border-green-400">
                        #codex
                      </span>
                      <span className="shadow-lg inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-purple-100 border hover:border-purple-400">
                        #unique
                      </span>
                    </>
                  )}
                </div>
                <div className="lg:pt-6 lg:pb-0 pb-2 pt-0 lg:px-0 px-4 lg:ml-auto ml-0 lg:mr-8 mr-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-bookmark"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />{" "}
                  </svg>
                </div>
              </div>
            </div>
          </>
        ))}
    </>
  );
};
export default PostCardwithImage;
