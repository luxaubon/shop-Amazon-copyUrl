"use client";


import React,{useEffect,useState} from 'react'
import { BsFillBookmarkCheckFill,BsBookmark } from "react-icons/bs";
import {checkLikeStatus , checkFavorite} from "@/lib/actions"
import { signIn,useSession } from "next-auth/react";

import FromModal from "@/components/FromModal";

interface Props {
    uid: string;
}
function Like({uid} : Props) {

    const { data: session } = useSession();
    
    const [isFavorite, setIsFavorite] = useState(false);
    const [email, setEmail] = useState<string>("");

    const handleClickLike = async () => {
        const addnewData = await checkLikeStatus(uid,email);
        setIsFavorite(true);
    };
    const handleClickUnlike = async () => {
        const unnewData = await checkLikeStatus(uid,email);
        setIsFavorite(false);
    }

    useEffect(() =>  {
        
        try {
            
            const userEmail = session?.user?.email;
            setEmail(userEmail!); 

            const OnLoadcheckFavorite = async () => {
                const dataF = await checkFavorite(uid,email);
                
                if(dataF){
                    const favoritelog = dataF.favoritelog;
                    const hasLog = favoritelog.includes(uid);
                    if(hasLog){
                        setIsFavorite(true)
                    }else{
                        setIsFavorite(false)
                    }
                }  
            }
            OnLoadcheckFavorite();
        } catch (error) {
            console.log(error)
        }
    },[uid,session])

  return (
    <div>
        {session ? (
            isFavorite ? ( 
                <BsFillBookmarkCheckFill 
                   onClick={handleClickUnlike}
                />
           ) : ( 
               <BsBookmark 
                   onClick={handleClickLike}
               />
           )
        ) : (
            <FromModal ActionType='BsBookmark' />
        )}
  </div>
  )
}

export default Like