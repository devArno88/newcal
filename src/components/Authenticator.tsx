import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { FunctionComponent, ReactNode } from "react";

interface PropTypes {
    session: Session;
    children: ReactNode;
}

export const Authenticator: FunctionComponent<PropTypes> = (props) => {
    const { data: session, status } = useSession();

    // When rendering client side don't display anything until loading is complete
    // if (typeof window !== "undefined" && status === "loading") return null;

    // If no session exists, display access denied message
    // if (!session) {
    //     return (
    //         <Layout session={session}>
    //             <AccessDenied />
    //         </Layout>
    //     );
    // }

    return <>{props.children}</>;
};
