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
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

export default function MyCommentCard() {
  const token = useSelector((state) => state.user.tokenVar);
  const userVar = useSelector((state) => state.user.userVar);

  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(api + `/getcommentsByUserId/${userVar?.userId}`)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userVar?.userId]);

  return (
    <>
      {data ? (
        <>
          {data.map((item) => (
            <>
              <div className="w-full rounded-lg shadow-sm border p-4 bg-white flex mb-4 justify-between">
                <div className="lg:pl-4 pl-0">
                  <Link href={"/post/" + item.postId}>
                    <div className="font-bold text-medium">
                      {item.postTitle}
                    </div>
                  </Link>
                  <div className="flex space-x-4 text-gray-600 text-xs">
                    <p className="font-bold">{item.text}</p>
                    <Dateformat timestamp={item.createdAt} />
                  </div>
                </div>
                <div className="space-x-4 flex items-center justify-center">
                  <button
                    type="submit"
                    className=" bg-green-100 hover:bg-green-200 rounded-lg px-4 py-2"
                  >
                    <BiEditAlt style={{ color: "green", fontSize: "1.5rem" }} />
                  </button>
                  <button
                    type="submit"
                    className="bg-red-100 hover:bg-red-200 rounded-lg px-4 py-2"
                  >
                    <MdDeleteForever
                      style={{ color: "red", fontSize: "1.5rem" }}
                    />
                  </button>
                </div>
              </div>
            </>
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
}
