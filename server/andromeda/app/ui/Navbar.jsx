import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";


const Navbar = () => {
    const handleLogin = () => {
        console.log("Login button clicked!");
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "white",
        }}>
            <h1 style={{
                fontSize: "22px",
                fontWeight: "700",
                fontFamily: 'Aboreto',
                margin: 0
            }}>Andromeda ✨</h1>
            <Button
                style={{
                    paddingLeft: "10px",
                }}
                leftSection={<IconLogout size={18} />}
                radius="xl"
                size="xsm"
                onClick={() => signOut("google")}
            >
                Sign out
            </Button>
        </div>
    );
};

export default Navbar;