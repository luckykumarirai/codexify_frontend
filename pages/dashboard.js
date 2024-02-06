import { useEffect, useState } from "react";
import SideBar from "../components/sidebars";
import { AiOutlineUnorderedList, AiOutlineTags } from "react-icons/ai";
import { FiUsers, FiUserCheck } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { BiCommentDetail } from "react-icons/bi";
import Analytics from "../components/dashboardComponents/analytics";
import MyPosts from "../components/dashboardComponents/myPosts";
import Followings from "../components/dashboardComponents/followings";
import Followers from "../components/dashboardComponents/followers";
import Comments from "../components/dashboardComponents/comments";
import TagsFollowed from "../components/dashboardComponents/tagsFollowed";
import { useRouter } from "next/router";
import Bookmarks from "../components/dashboardComponents/bookmark";
import Title from "../components/layout/title";
const Dashboard = () => {
  const router = useRouter();

  const { tab } = router.query;

  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    if (router.isReady) {
      if (tab) {
        setSelectedOption(tab);
      } else {
        setSelectedOption("Dashboard");
      }
    }
  }, [tab, router.isReady]);

  const sidebarButtons = [
    {
      name: "Dashboard",
      icon: <RxDashboard />,
      onClick: () => {
        router.push("/");
      },
    },
    {
      name: "My Posts",
      icon: <AiOutlineUnorderedList />,
      onClick: () => {
        router.push("?tab=My Posts");
      },
    },
    {
      name: "Comments",
      icon: <BiCommentDetail />,
      onClick: () => {
        router.push("?tab=Comments");
      },
    },
    {
      name: "Followers",
      icon: <FiUsers />,
      onClick: () => {
        router.push("?tab=Followers");
      },
    },
    {
      name: "Followings",
      icon: <FiUserCheck />,
      onClick: () => {
        router.push("?tab=Followings");
      },
    },
    {
      name: "Tags Followed",
      icon: <AiOutlineTags />,
      onClick: () => {
        router.push("?tab=Tags Followed");
      },
    },
    {
      name: "Boookmarks",
      icon: <AiOutlineTags />,
      onClick: () => {
        router.push("?tab=Boookmarks");
      },
    },
  ];

  return (
    <>
      {selectedOption ? (
        <div className="bg-gray-100 flex">
          <Title title="dashboard" description="Codex-Dashboard" />
          <SideBar
            selectedOption={selectedOption}
            sidebarButtons={sidebarButtons}
          />
          <div className="p-4 w-full">
            {selectedOption === "Dashboard" && <Analytics />}
            {selectedOption === "My Posts" && <MyPosts />}
            {selectedOption === "Followings" && <Followings />}
            {selectedOption === "Followers" && <Followers />}
            {selectedOption === "Comments" && <Comments />}
            {selectedOption === "Tags Followed" && <TagsFollowed />}
            {selectedOption === "Boookmarks" && <Bookmarks />}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Dashboard;
