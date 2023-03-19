import { Session } from "next-auth";
import { E_Roles } from "../interfaces";

export const isAdmin = (session: Session) =>
    [E_Roles.concierge, E_Roles.development, E_Roles.management].includes(session?.role);

export const isManagement = (session: Session) => session?.role === E_Roles.management;
export const isConcierge = (session: Session) => session?.role === E_Roles.concierge;
