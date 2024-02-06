import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import CommentForm from "../../components/comment/commentForm";
import ListComments from "../../components/comment/listComments";
import MarkdownViewer from "../../components/markdownView.js/markdownViewer";
import Like from "../../components/like/like";
import { api } from "../../utils/backendUrl";
import UserCard from "../../components/card/userCard";
import PostCard from "../../components/card/postCard";
import Title from "../../components/layout/title";
import Image from "next/image";

export default function Post() {
  const router = useRouter();
  const { postUrl } = router.query;
  const token = useSelector((state) => state.user.tokenVar);
  const userVar = useSelector((state) => state.user.userVar);
  const [data, setData] = useState();
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [userId, setUserId] = useState();
  const [postTitle, setPostTitle] = useState("");
  const [bloggerUserId, setBloggerUserId] = useState();
  const [followStatus, setFollowStatus] = useState(false);
  const [bloggerDetails, setBloggerDetails] = useState();

  useEffect(() => {
    getPostDetails(postUrl);
    getLikeStatus(postUrl, userVar?.userId);
  }, [postUrl, userVar?.userId]);

  useEffect(() => {
    if (bloggerUserId) {
      axios
        .get(api + `/getuserProfileById/${userVar?.userId}`)
        .then((response) => {
          if (response.status === 200) {
            //console.log(response.data);
            //console.log(response?.data[0]?.following?.includes(bloggerUserId));
            setFollowStatus(
              response?.data[0]?.following?.includes(bloggerUserId)
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [bloggerUserId, userVar?.userId]);

  useEffect(() => {
    if (bloggerUserId) {
      axios
        .get(api + `/getuserProfileById/${bloggerUserId}`)
        .then((response) => {
          if (response.status === 200) {
            setBloggerDetails(response?.data[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [bloggerUserId]);

  function getPostDetails(postUrl) {
    axios
      .get(api + `/getpost/${postUrl}`)
      .then((response) => {
        //console.log(response);
        if (response.status === 200 && response.data[0]) {
          setLikeCount(response.data[0].likesCount);
          setData(response.data[0]);
          setPostTitle(response.data[0].title);
          setBloggerUserId(response.data[0].userId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getLikeStatus(postUrl, userId) {
    if (userId) {
      axios
        .get(api + `/likeStatus/${userId}/${postUrl}`)
        .then((response) => {
          //console.log(response);
          if (response.status === 200) {
            setIsLike(response?.data?.likeStatus);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return Promise.resolve();
    }
  }

  return (
    <div className="mt-20 container mx-auto" id="page-content">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div
          className="fixed bottom-0 lg:relative lg:border-none border lg:shadow-none sm:shadow-lg w-full bg-white lg:w-fit lg:col-span-1 lg:col-start-2 p-1"
          id="sidebar-left"
        >
          <Like
            isLike={isLike}
            postUrl={postUrl}
            likeCount={likeCount}
            userId={userVar?.userId}
            setIsLike={(val) => setIsLike(val)}
            setLikeCount={(val) => setLikeCount(val)}
          />
        </div>

        <div className="lg:col-span-6 lg:overflow-auto" id="main-content">
          <div className="border rounded-md">
            {data ? (
              <div className="px-4 py-4">
                <Title title={data.title} description={`Codex-${data.title}`} />
                {data.posterImage ? (
                  <Image
                    src={data.posterImage}
                    alt="Poster Image"
                    width="400"
                    height="300"
                    layout="responsive"
                    className="flex justify-center max-h-60 w-full object-cover mb-2"
                  />
                ) : null}
                <h1 className="font-bold text-3xl mb-2">{data.title}</h1>
                <div>
                  <MarkdownViewer markdown={data.body} />
                </div>
              </div>
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
            <div id="comment-form" className="border-t border-gray-200">
              <CommentForm postId={postUrl} postTitle={postTitle} />
            </div>
          </div>
          <div className="mr-auto ml-auto mt-10">
            <div className="border rounded-md px-4 py-4">
              <p className=" text-2xl fond-serif font-bold text-blue-700">
                Comments
              </p>
              <ListComments postId={postUrl} />
            </div>
          </div>
        </div>
        <div
          className="lg:col-span-3 lg:col-start-9 lg:col-end-12 hidden sm:block"
          id="sidebar-right"
        >
          <UserCard
            bloggerDetails={bloggerDetails}
            bloggerUserId={bloggerUserId}
            followStatus={followStatus}
            handleFollowStatus={(status) => setFollowStatus(status)}
          />
          <PostCard />
        </div>
      </div>
    </div>
  );
}
