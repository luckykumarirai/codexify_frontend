import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Link from "next/link";
import Dateformat from "../../utils/dateformat";
import { api } from "../../utils/backendUrl";
import { Oval } from "react-loader-spinner";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import DecisionDialog from "../modals/decisionDialog";

export default function MyPosts() {
  const token = useSelector((state) => state.user.tokenVar);
  const userVar = useSelector((state) => state.user.userVar);

  const [userId, setUserId] = useState();
  const [data, setData] = useState();
  const [isPostDeleted, setIsPostDeleted] = useState(false);

  useEffect(() => {
    if (userVar?.userId) {
      setUserId(userVar?.userId);
    }
  }, [userVar?.userId]);

  useEffect(() => {
    function getmyPost() {
      axios
        .get(api + `/getpostByUserId/${userVar.userId}`)
        .then((response) => {
          if (response.status === 200) {
            setData(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getmyPost();
  }, [token, userVar?.userId]);

  const handleDelete = (postId, title) => {
    axios
      .delete(api + `/deletePost/${postId}`)
      .then((response) => {
        if (response.status == 200) {
          alert(title + "Post deleted successfully");
          getmyPost();
          setIsPostDeleted(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <p className="text-xl font-bold mb-4">My Posts</p>
      {data ? (
        <div>
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
                <div className="space-x-4 flex items-center justify-center">
                  {item.status === "draft" ? (
                    <Link href={"/newPost?id=" + item._id}>
                      <button
                        type="submit"
                        className="bg-orange-100 hover:bg-orange-200 rounded-lg px-4 py-2"
                      >
                        <p className="text-orange-500 ">Draft</p>
                      </button>
                    </Link>
                  ) : null}
                  <Link href={"/newPost?id=" + item._id}>
                    <button
                      type="submit"
                      className=" bg-green-100 hover:bg-green-200 rounded-lg px-4 py-2"
                    >
                      <BiEditAlt
                        style={{ color: "green", fontSize: "1.5rem" }}
                      />
                    </button>
                  </Link>
                  <button
                    type="submit"
                    onClick={() => setIsPostDeleted(true)}
                    className="bg-red-100 hover:bg-red-200 rounded-lg px-4 py-2"
                  >
                    <MdDeleteForever
                      style={{ color: "red", fontSize: "1.5rem" }}
                    />
                  </button>
                </div>
              </div>
              <DecisionDialog
                handleCancel={() => setIsPostDeleted(false)}
                handleSubmit={() => handleDelete(item._id, item.title)}
                isVisible={isPostDeleted}
              />
            </div>
          ))}
        </div>
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
    </div>
  );
}
