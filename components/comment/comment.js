import CommentAction from "./commentAction";
import UserDetails from "../../utils/username";
import Dateformat from "../../utils/dateformat";
import Image from "next/image";

export default function Comment({ comment }) {
  const { _id, postId, childComments, postTitle } = comment;

  return (
    <>
      <div className="mt-5 shadow-sm p-5">
        <div className="px-4 py-4 flex space-x-3">
          <Image src="/user.svg" alt="user" width="30" height="30" />
          <div className="text-gray-600 text-xs flex-col">
            <p className="font-semibold">{comment.userName}</p>
            <Dateformat timestamp={comment.createdAt} />
          </div>
        </div>
        <CommentAction commentId={_id} postId={postId} postTitle={postTitle} />
        <p className="text-gray-500 text-base">{comment.text}</p>
        {childComments && (
          <div className="text-red">
            {childComments.map((childComment) => (
              <>
                <Comment key={childComment._id} comment={childComment} />
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
