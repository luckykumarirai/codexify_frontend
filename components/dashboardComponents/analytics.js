import { AiOutlineUnorderedList, AiOutlineHeart } from "react-icons/ai";
import { FiUsers, FiUserCheck } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";

const Analytics = (props) => {
  return (
    <div>
      <p className="text-xl font-bold mb-4">User Statics</p>
      <div className="flex space-x-8">
        <div className="border w-40 py-4 shadow flex flex-col justify-center items-center space-y-2 bg-teal-100 rounded">
          <div className="w-fit p-4 rounded-full bg-teal-500">
            <FiUsers className="text-white" />
          </div>
          <p className="text-xl font-bold">231</p>
          <p>Followers</p>
        </div>
        <div className="border w-40 py-4 shadow flex flex-col justify-center items-center space-y-2 bg-cyan-100 rounded">
          <div className="w-fit p-4 rounded-full bg-cyan-500">
            <FiUserCheck className="text-white" />
          </div>
          <p className="text-xl font-bold">693</p>
          <p>Followings</p>
        </div>
      </div>
      <p className="text-xl font-bold my-4">Post Statics</p>
      <div className="flex space-x-8">
        <div className="border w-40 py-4 shadow flex flex-col justify-center items-center space-y-2 bg-blue-100 rounded">
          <div className="w-fit p-4 rounded-full bg-blue-500">
            <AiOutlineUnorderedList className="text-white" />
          </div>
          <p className="text-xl font-bold">150</p>
          <p>Written Posts</p>
        </div>
        <div className="border w-40 py-4 shadow flex flex-col justify-center items-center space-y-2 bg-red-100 rounded">
          <div className="w-fit p-4 rounded-full bg-red-500">
            <AiOutlineHeart className="text-white" />
          </div>
          <p className="text-xl font-bold">2834</p>
          <p>Posts Likes</p>
        </div>
        <div className="border w-40 py-4 shadow flex flex-col justify-center items-center space-y-2 bg-green-100 rounded">
          <div className="w-fit p-4 rounded-full bg-green-500">
            <BiCommentDetail className="text-white" />
          </div>
          <p className="text-xl font-bold">518</p>
          <p>Posts Comments</p>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
