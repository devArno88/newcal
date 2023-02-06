import { signIn, signOut } from "next-auth/react";

import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import { Avatar, Box, Button } from "@mui/material";

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
                    <Avatar alt={session.name} src={session.user?.image ?? "/user.png"} style={{ marginRight: 8 }} />

                    <Box sx={{ display: { xs: "none", sm: "block", overflow: "none" } }}>
                        <strong style={{ fontSize: 12 }}>
                            {session && session.name ? session.name.split(" ")[0] : null}
                        </strong>
                        <br />
                        <small style={{ fontSize: 12 }}>{`Flat ${session.flat}`}</small>
                    </Box>

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
