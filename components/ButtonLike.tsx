import { useState } from "react";
import { AiFillLike,AiFillDislike } from 'react-icons/ai';
import { likeComment } from "@/lib/actions/comment";

interface Props {
    commentId: string
    uid: string
    loglike: any
}

function ButtonLike({commentId,uid,loglike} : Props) {

    const [isLike, setIsLike] = useState(loglike);

    const handleLikeComment = async (commentId:string) => {
       const like =  await likeComment(uid,commentId);
       setIsLike(!isLike);
    }

  return (
    <>
    { uid && (
        isLike  ? (
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleLikeComment(commentId)}>
                <AiFillDislike />
            </button>
        ) : (
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleLikeComment(commentId)}>
            <AiFillLike />
            </button>
        )
    )}
    </>
  )
}

export default ButtonLike