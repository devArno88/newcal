import { AdminIcons, isAdmin } from "@/src/utils";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import { Avatar, Box, Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";

export default function AuthBar(props: any): JSX.Element {
    const { session } = props;
    const adminAccount = isAdmin(session);
    const Icon = adminAccount ? AdminIcons[session.role] : null;
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
                    {adminAccount && Icon ? (
                        <Avatar alt={session?.role} src="/" sx={{ bgcolor: "greenyellow", mr: 1, opacity: 0.9 }}>
                            <Icon sx={{ fill: "#333" }} />
                        </Avatar>
                    ) : (
                        <Avatar alt={session.name} src={session.user?.image ?? "/user.png"} sx={{ mr: 1 }} />
                    )}

                    <Box sx={{ display: { xs: "none", sm: "block", overflow: "none" } }}>
                        <strong style={{ fontSize: 12, color: "greenyellow" }}>
                            {adminAccount ? session?.name : session.name.split(" ")[0]}
                        </strong>
                        <br />
                        <small style={{ fontSize: 11 }}>{adminAccount ? "NewCal Admin" : `Flat ${session.flat}`}</small>
                    </Box>

                    <ExitToAppTwoToneIcon
                        fontSize="large"
                        sx={{ ml: 4, cursor: "pointer" }}
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
                            signIn(null, { callbackUrl: `${process.env.NEXTAUTH_URL}/mycal` });
                        }}
                    >
                        Log In
                    </Button>
                </>
            )}
        </div>
    );
}
