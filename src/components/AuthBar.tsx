import {
    SessionContextValue,
    signIn,
    signOut,
    useSession,
} from "next-auth/react";

import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import { Avatar, IconButton, Button } from "@mui/material";

export default function AuthBar(props: any): JSX.Element {
    const { session } = props;

    return (
        <div
            style={{
                width: "fit-content",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            {session ? (
                <>
                    <Avatar
                        alt={session.name}
                        src={session.user?.image ?? "/user.png"}
                        style={{ marginRight: 8 }}
                    />

                    <span>
                        <small>{`Flat ${session.flat}`}</small>
                        <br />
                        <strong>
                            {session && session.name ? session.name : null}
                        </strong>
                    </span>

                    <ExitToAppTwoToneIcon
                        fontSize="large"
                        sx={{ ml: 4 }}
                        onClick={(e) => {
                            e.preventDefault();
                            signOut({ callbackUrl: "/" });
                        }}
                    />
                </>
            ) : (
                <>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: "green" }}
                        href={`/api/auth/signin`}
                        onClick={(e) => {
                            e.preventDefault();
                            signIn();
                        }}
                    >
                        Log In
                    </Button>
                </>
            )}
        </div>
    );
}
