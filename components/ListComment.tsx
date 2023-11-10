"use client"
import { useGlobalContext } from "@/app/context/store";
import { useEffect,useState } from "react";
import { useSession } from "next-auth/react";

import { getCommentsProduct } from "@/lib/actions/comment";

import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';
import ButtonLike from "./ButtonLike";

interface Props {
    pid: string
}
interface Comment {
    id: string
    title: string
    detail: string
    createdAt: string
    updatedAt: string
    loglike: any
    _id: string
}

function ListComment({pid} : Props) {
  const {title,detail} = useGlobalContext();
  const { data: session } = useSession();

  const [uid, setUid] = useState('');
  const [getAllComment, setGetAllComment] = useState<Comment[]>([]);

    useEffect(() =>  {
        const fetchComments = async () => {
            try {
              const listComments = await getCommentsProduct(pid);
              setGetAllComment(listComments);
            } catch (error) {
              console.log(error);
            }
          };
        fetchComments();
        
    },[title,detail,uid])

    useEffect(() => {
      try {
        const userId = session?.user?.id;
        setUid(userId || '');
        console.log(session);
      } catch (error) {
        console.log(error);
      }
    }, [session]);

    

  return (
    <div>
      {getAllComment && getAllComment?.length > 0 && (
       
        getAllComment.map((comment,index) => (
            <div className="p-5" key={index}>
                <div className="container-fluid p-8 border border-l-8 border-blue-500 shadow-xl rounded-lg bg-gray-100 ">
                  
                    <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500">Anonymous</p>
                            <p className="text-xs text-gray-400">Anonymous</p>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-semibold">{comment.title}</h1>
                        <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: th  })}</p>
                    </div>
                    
                    <ButtonLike uid={uid} commentId={comment._id} loglike={comment.loglike && comment.loglike.includes(uid) ? true : false}/>
                    
                    <div className="h-auto w-auto p-6 mt-8 rounded-lg bg-green-200 border border-green-300">{comment.detail}</div>
                </div>
            </div>
       ))

      )}
    </div>
  )
}

export default ListComment