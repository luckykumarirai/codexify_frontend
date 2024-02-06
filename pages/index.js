import SocialMediaCard from "../components/card/SocialMediaCard";
import CreateAccountCard from "../components/card/createAcoountCard";
import PopularTags from "../components/card/popularTagCard";
import PostCard from "../components/card/postCard";
import SideNavbarCard from "../components/card/sideNavbarCard";
import SubscriptionCard from "../components/card/subscriptionCard";
import Comments from "../components/comment/comment";
import Title from "../components/layout/title";
import PostCardwithImage from "../components/post/postCardwithIamge";
import Posts from "../components/post/posts";

export default function Home() {
  return (
    <>
      <Title title="Codex|Blog|Learn Tech" />
      <div className="w-full flex justify-center">
        <div className="w-11/12 lg:w-7/12">
          <Posts />
        </div>
      </div>
      {/* <div className="pt-20 container mx-auto bg-slate-100" id="page-content">
        <div
          className="grid grid-cols-1 lg:grid-cols-12"
          id="page-content-inner"
        >
          <div className="lg:col-span-2 lg:col-start-2" id="sidebar-left">
            <div className="hidden sm:block">
              <CreateAccountCard />
              <SideNavbarCard />
              <SocialMediaCard />
              <PopularTags />
            </div>
          </div>
          <div className="lg:col-span-5" id="main-content">
            <div className="overflow-y-auto mx-4 lg:mx-0">
              <Posts />
            </div>
          </div>
          <div
            className="lg:col-span-3 lg:col-start-9 lg:col-end-12 hidden sm:block"
            id="sidebar-right"
          >
            <SubscriptionCard />
            <PostCard />
          </div>
        </div>
      </div> */}
    </>
  );
}
// export async function getStaticProps() {
//   console.log("envirnoment variable",process.env.APIURL);
//   return {
//     props: {},
//   };
// }
