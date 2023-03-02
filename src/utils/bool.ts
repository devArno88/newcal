import { Session } from "next-auth";
import { E_Roles } from "../interfaces";

export const isAdmin = (session: Session) =>
    [E_Roles.concierge, E_Roles.development, E_Roles.management].includes(session?.role);
