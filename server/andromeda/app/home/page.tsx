"use client"

import Dashboard from "@/dashboard/page";
import WelcomeSignIn from "@/ui/WelcomeSignIn";
import { Flex, Loader } from "@mantine/core";
import { useSession } from "next-auth/react";

const Home = () => {
    const { status } = useSession();
    // Show a loading state while checking session status
    if (status === "loading") {
        return (
            <Flex
                mih={50}
                gap="md"
                justify="center"
                align="center"
                direction="column"
                wrap="nowrap"
                style={{
                    height: "100vh"
                }}>
                <Loader
                    color="magenta" size="xl" />
            </Flex>
        )
    }

    // If the user is not logged in, show the login button
    if (status === "unauthenticated") {
        return (
            <WelcomeSignIn></WelcomeSignIn>
        );
    } else {
        return (
            <Dashboard></Dashboard>
        )
    }
};

export default Home;