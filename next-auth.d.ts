import { DefaultSession } from "next-auth";
import { E_Roles } from "./src/interfaces";

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
        role?: E_Roles;
        expires: string;
    }
}
