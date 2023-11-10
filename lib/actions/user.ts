"use server"

import bcrypt from 'bcrypt';
import { signIn,useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import MUser from "@/lib/models/user.model";
import {connectToDB} from "@/lib/mongoose";
import { User,loginUser } from "@/types";


export async function InsertUserProfiles(UserProfiles: User) {

    if(!UserProfiles) return;

    try{   
        connectToDB();

        let user = UserProfiles;
        // const existingUser = await MUser.findOne({email: user.email});
        user.password = await bcrypt.hash(user.password, 10);
        // if(existingUser){
            
        //     const updatedPriceHistory:any = [
        //         ...existingUser.logHistory,
        //         {
        //             data: user.username,
        //             date: Date.now()
        //         }
        //     ];
            
        //     user = {
        //         ...user,
        //         logHistory: updatedPriceHistory,
        //     }
        // }

        const newProduct = await MUser.create(user);
        const result = await signIn("credentials", {
            email: user?.email,
            password: user?.password
        });
        

        //revalidatePath(`/`);

    } catch(err) {
        throw new Error(`error scraping product DATA HERE: ${err}`);
    }
}


export async function loginUser(UserProfiles: loginUser){
    try{
    
        connectToDB();
        let user = UserProfiles;
        const data = await MUser.findOne({email: user.email});
        if(!data) return;

        return data;
    } catch(err) {
        throw new Error(`error scraping product DATA HERE: ${err}`);
    }

}