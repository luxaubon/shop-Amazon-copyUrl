"use server"

import {connectToDB} from "@/lib/mongoose";
import Comment from "@/lib/models/comment.model";

export type Comments = {
    uid: string;
    pid: string;
    title: string;
    detail: string;
  }

export async function commentsProduct(comments : Comments) {

    if(!comments) return;

    try{   
        connectToDB();

        const newComment = await Comment.create({
            'uid':comments.uid,
            'pid':comments.pid,
            'title':comments.title,
            'detail':comments.detail,
        });
        const plainObject = JSON.parse(JSON.stringify(newComment));
        return plainObject;

    } catch(err) {
        throw new Error(`error  DATA HERE: ${err}`);
    }

}

export async function getCommentsProduct(pid : string) {

    try {
        connectToDB();
    
        const currentComment = await Comment.find({pid:pid});
    
        if(!currentComment) return null;
        // return currentComment;
        const plainObject = JSON.parse(JSON.stringify(currentComment));
        return plainObject;
        
      } catch (error) {
        console.log(error);
      }

}

export  async function likeComment(uid : string,commentId : string) {
   
    try {
        connectToDB();

        const likeComment = await Comment.findOne({_id:commentId});
        if (!likeComment)  return 'not found';

        if (likeComment){

            const plainObject = JSON.parse(JSON.stringify(likeComment));
            const loglikes = plainObject.loglike;
            const hasLog = loglikes.includes(uid);

            if(hasLog){
                    const updatedlikeLog = loglikes.filter((item:string) => item !== uid);
                    const countLike = likeComment.like = likeComment.like - 1;
                    const updateComment = await Comment.updateOne(
                        { _id: commentId },
                        { $set: {
                            like: countLike,
                            loglike: updatedlikeLog
                        } }
                    );
                    return updateComment;
              }else{
                const updateLogLike = [
                    ...likeComment.loglike,uid
                ];
                const countLike = likeComment.like = likeComment.like + 1;
                const updateComment = await Comment.updateOne(
                    { _id: commentId },
                    { $set: {
                        like: countLike,
                        loglike: updateLogLike
                    } }
                );
                return updateComment;
              }
        }
      } catch (error) {
        console.log(error);
      }

}
