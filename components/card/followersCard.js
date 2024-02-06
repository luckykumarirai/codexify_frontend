import Image from "next/image";

const FollowersCard = (params) => {
  return (
    <>
      <div className="w-full lg:w-[30%] rounded-lg shadow-sm border p-4 bg-white mb-4">
        <div className="flex">
          <div className="flex items-center">
            <div className="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-100 rounded-full">
              <span className="font-medium text-gray-600 text-xl">
                {params?.firstName[0]?.toUpperCase() +
                  params?.lastName[0]?.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-cyan-700 font-bold text-2xl">
              {params.firstName + " " + params.lastName}
            </p>
            <p className="text-cyan-600 font-semibold">@{params.userName}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default FollowersCard;
