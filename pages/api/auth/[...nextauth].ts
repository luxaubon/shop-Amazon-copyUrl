import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Muser from '@/lib/models/user.model';
import { connectToDB } from "@/lib/mongoose";
import { compare } from 'bcrypt';

interface User {
  id: string;
  email: string;
}

export default NextAuth({
  providers: [
    Credentials({
      id:'credentials',
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        if(!credentials?.email || !credentials?.password){
            return null;
        }
        connectToDB();  
        
        const user = await Muser.findOne({ email: credentials?.email});

        if( !user ){
            return null;
        }
        
        const isCorrectPassword = await compare(credentials.password, user.password);

        
        if(!isCorrectPassword){
            return null;
        }


        const datauser = {
            id: user._id,
            email: user.email,
        }
        return datauser;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
        if (account) {
           token.accessToken = account.accessToken;
        }
        if(user){
            token.user = user;
        }
        return token;
    },
    async session({ session, token }) {
      
      session.accessToken = token.accessToken;
      session.user = token.user as User;
      return session;
    }
  },
  pages: {
    signIn: "/"
  },
  session: {
    strategy: "jwt"
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET
});
