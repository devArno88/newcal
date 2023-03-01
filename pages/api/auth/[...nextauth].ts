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
            let activeSession = session;
            const newCalData = await clientPromise;
            const residentData = await newCalData.db("newcal").collection("residents").findOne({ email: user.email });
            const adminData = await newCalData.db("newcal").collection("admins").findOne({ email: user.email });

            // Try as resident
            if (residentData) {
                activeSession.id = residentData._id.toString();
                activeSession.flat = residentData.flat;
                activeSession.name = residentData.name;
                activeSession.role = "resident";
                // return activeSession;
            }

            // Try as management
            if (adminData) {
                activeSession.id = adminData._id.toString();
                activeSession.name = adminData.name;
                activeSession.role = adminData.role;
            }

            return activeSession;
        },

        async signIn({ user, account, profile, email, credentials }) {
            const newCalData = await clientPromise;
            const isValidResident = await newCalData
                .db("newcal")
                .collection("residents")
                .findOne({ email: user.email });
            const isValidAdmin = await newCalData.db("newcal").collection("admins").findOne({ email: user.email });
            if (!isValidResident && !isValidAdmin) return false;
            return true;
        },
    },
};

export default NextAuth(authOptions);
