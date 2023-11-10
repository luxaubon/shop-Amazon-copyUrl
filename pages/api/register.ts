import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import Muser from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
import { User } from '@/types';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  
    if(req.method != 'POST'){
        return res.status(405).end();
    }
    
    try{
        connectToDB();
        // let userData = UserProfiles;
        // const {email,name,password} = req.body

        const {email,username,password} = req.body;
        const existingUser = await Muser.findOne({email: email});
     
        if(existingUser){
            return res.status(422).json({message:'Email already exists'})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await Muser.create({
                'email':email,
                'username':username,
                'password':hashedPassword,
                'repassword':password,
        })
        return res.status(200).json(user)

    }catch(err){
        console.log(err)
        return res.status(400).end();
    }
}