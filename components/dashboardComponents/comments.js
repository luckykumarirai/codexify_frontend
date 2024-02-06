import MyCommentCard from "../card/commentsCard";

const Comments = () => {
  return (
    <>
      <p className="text-xl font-bold mb-4">Comments</p>
      <div className="flex flex-row flex-wrap gap-4 ">
        <MyCommentCard />
      </div>
    </>
  );
};
export default Comments;
