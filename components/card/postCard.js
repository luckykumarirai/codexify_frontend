import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Link from "next/link";
import Dateformat from "../../utils/dateformat";
import { api } from "../../utils/backendUrl";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import { generateRandomColorCode } from "../../utils/generateRandomColor";
import { AiOutlinePaperClip, AiFillFire } from "react-icons/ai";

export default function PostCard() {
  const token = useSelector((state) => state.user.tokenVar);
  const userVar = useSelector((state) => state.user.userVar);

  const [userId, setUserId] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    if (userVar?.userId) {
      setUserId(userVar?.userId);
    }
  }, [userVar]);

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
    <div className="w-11/12 mb-3 ml-auto mr-auto overflow-hidden">
      <div className="px-4 py-4">
        <div className="text-2xl font-semibold justify-center flex space-x-2">
          <p>Popular Post</p>
          <AiFillFire style={{ color: "red", marginTop: "5px" }} />
        </div>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="px-2 py-2 flex space-x-3">
        <div className="text-2xl">
          <AiOutlinePaperClip />
        </div>
        <div className="text-base flex-col">
          {/* <Link href={"/post/" + item.postUrl}> */}
          <p>This is the most tredning topic today</p>
          {/* </Link> */}
        </div>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="px-2 py-2 flex space-x-3">
        <div className="text-2xl">
          <AiOutlinePaperClip />
        </div>
        <div className="text-base flex-col">
          {/* <Link href={"/post/" + item.postUrl}> */}
          <p>This is the most tredning topic today</p>
          {/* </Link> */}
        </div>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="px-2 py-2 flex space-x-3">
        <div className="text-2xl">
          <AiOutlinePaperClip />
        </div>
        <div className="text-base flex-col">
          {/* <Link href={"/post/" + item.postUrl}> */}
          <p>This is the most tredning topic today</p>
          {/* </Link> */}
        </div>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="px-2 py-2 flex space-x-3">
        <div className="text-2xl">
          <AiOutlinePaperClip />
        </div>
        <div className="text-base flex-col">
          {/* <Link href={"/post/" + item.postUrl}> */}
          <p>This is the most tredning topic today</p>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
