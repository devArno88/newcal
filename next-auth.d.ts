import { DefaultSession } from "next-auth";

interface extendedSession {}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user?: DefaultSession["user"];
        id?: string;
        flat?: number;
        name?: string;
        role?: string;
        expires: string;
    }
}
