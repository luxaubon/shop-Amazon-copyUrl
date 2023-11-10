"use client"

import { useState,useEffect } from "react";
import { signIn,useSession } from "next-auth/react";

import { commentsProduct } from "@/lib/actions/comment";
import { useGlobalContext } from "@/app/context/store";

interface Props {
    pid: string
}
function Comment({pid} : Props) {
    const { data: session } = useSession();

    const {uid,setUid,title,setTitle,detail,setDetail} = useGlobalContext();
    
    useEffect(() =>  {
        
        try {
            const userId = session?.user?.id;
            setUid(userId!); 
            
        } catch (error) {
            console.log(error)
        }
    },[pid,title,detail,uid])

    const handleComment = async () => {
        if(!uid || !detail || !title){
            alert('please fill all field');
            return;
        }
      const data = {
            uid: uid,
            pid: pid,
            title,
            detail,
      }
      const comments = await commentsProduct (data);
      setTitle('');
      setDetail('');
    }
  return (
    <>
      {session ? (
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl text-secondary font-semibold">
            Comment 
          </h3>
            <div className=" p-3 w-full">
                <input type="text" className="border p-2 rounded w-full" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="mt-3 p-3 w-full">
                <textarea  className="border p-2 rounded w-full" placeholder="Write something..." onChange={(e) => setDetail(e.target.value)} value={detail}></textarea>
            </div>

            <div className="flex justify-between mx-3">
              <div>
                <button type='button' className="px-4 py-1 bg-gray-800 text-white rounded font-light hover:bg-gray-700" onClick={handleComment}>
                  Submit
                </button>
              </div>
            </div>

        </div>
      ): null}
        </>
  )
}

export default Comment