import { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./comment";
import { api } from "../../utils/backendUrl";
import { useSelector } from "react-redux";

export default function ListComments(props) {

  const tokenVar = useSelector((state) => state.user.tokenVar);
  const userId = useSelector((state) => state.user.userVar);
  //console.log(userId);
  const postId = props.postId;

  const [comments, setComments] = useState([]);
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    if (postId) {
      const config = {
        headers: {
          Authorization: `Bearer ${tokenVar}`,
        },
      };
      axios
        .get(api + `/getcomments/${postId}`, config)
        .then((response) => {
          //console.log(response.data);
          setComments(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [comments, postId, tokenVar]);

  return (
    <>
      {comments
        ? comments.map((item, index) => {
            return <Comment key={item._id} comment={item} />;
          })
        : null}
    </>
  );
}
