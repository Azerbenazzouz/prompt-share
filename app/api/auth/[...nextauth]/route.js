import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from '@/utils/database';
import { User } from '@/models/user'

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks:{
        async session({ session }){
            const sessionUser = await User.findOne({ 
                email: session.user.email 
            });
            session.user.id = sessionUser._id.toString();
            
            return session;
        },
        async signIn({ profile }){
            try{
                await connectToDatabase(); // Connect to the database
                // Check if the user already exists in the database
                const userExists = await User.findOne({ email: profile.email });
                // If the user does not exist, create a new user in the database
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        name: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
            }catch(err){
                console.error('Failed to sign in:', err);
                return false;
            }
        }
    },
});

export { handler as GET, handler as POST };