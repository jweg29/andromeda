"use client"

import { Button, Container, Flex, Space, Text } from "@mantine/core";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
    const { data: session, status } = useSession();

    // Show a loading state while checking session status
    if (status === "loading") {
        return <Text align="center">Loading...</Text>;
    }

    // If the user is not logged in, show the login button
    if (status === "unauthenticated") {
        return (
            <Container
                style={{
                    height: "100vh", // Ensures the height fills the viewport
                    background: "linear-gradient(135deg, #19004B, #260073, #310093, #3B00B2, #4300C8)",
                    boxSizing: "border-box", // Ensures padding is included in height calculations
                    margin: 0, // Removes default margin
                }}
            >
                <Flex
                    mih={50}
                    gap="md"
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
                >
                    <Space h="xl" />

                    <Text
                        style={{
                            fontSize: "60px",
                            fontWeight: "700",
                            fontFamily: 'Aboreto',
                        }}
                        size="h1"
                        align="center"
                        fontFamily="Verdana"//"Aboreto"

                        color="#ffffff"
                        textshadow="0 0 40px rgba(255, 255, 255, 0.8)" // Glow effect
                    >
                        Andromeda ✨
                    </Text>
                    <Space h="l" />
                    <Button
                        leftSection={<IconBrandGoogleFilled size={20} />}
                        //color=""
                        radius="xl"
                        size="xl"
                        onClick={() => signIn("google")}
                    >
                        Sign in with Google
                    </Button>
                    <Space />
                </Flex>
            </Container >
        );
    }

    // If the user is logged in, show the dashboard view
    return (
        <Container>
            <Text size="lg" align="center">
                Welcome back, {session.user?.name}!
            </Text>
            <Button onClick={() => signOut()} mt="lg" size="lg" variant="light">
                Logout
            </Button>
            {/* Replace with your actual dashboard */}
            <Text mt="lg">Here is your dashboard view!</Text>
        </Container>
    );
};

export default Home;