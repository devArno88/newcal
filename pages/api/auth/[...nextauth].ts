import clientPromise from "@/src/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    secret: "sdfjhsdjfhsdkjfhkhjdskhds",

    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],

    callbacks: {
        async jwt({ token }) {
            token.userRole = "admin";
            return token;
        },

        async session({ session, token, user }) {
            const newCalData = await clientPromise;
            const residentData = await newCalData.db("newcal").collection("residents").findOne({ email: user.email });

            session.id = residentData._id.toString();
            session.flat = residentData.flat;
            session.name = residentData.name;
            session.role = "resident";
            return session;
        },

        async signIn({ user, account, profile, email, credentials }) {
            const newCalData = await clientPromise;
            const isValidResident = await newCalData
                .db("newcal")
                .collection("residents")
                .findOne({ email: user.email });
            if (!isValidResident) return false;
            return true;
        },
    },
};

export default NextAuth(authOptions);
