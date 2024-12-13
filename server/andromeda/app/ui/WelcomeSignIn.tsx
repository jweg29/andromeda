"use client"

import { Button, Container, Flex, Space, Text } from "@mantine/core"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import { signIn } from "next-auth/react"


export default function WelcomeSignIn() {
    return (
        <Container fluid
            style={{
                height: "100vh", // Ensures the height fills the viewport
                boxSizing: "border-box", // Ensures padding is included in height calculations
                margin: 0,
                padding: 0,
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
                        fontSize: "46px",
                        fontWeight: "700",
                        fontFamily: 'Aboreto',
                        textshadow: "0 0 40px rgba(255, 255, 255, 0.8)" // Glow effect
                    }}
                    size="h1"
                    color="#ffffff"
                >
                    Andromeda ✨
                </Text>
                <Space h="l" />
                <Button
                    style={{
                        paddingLeft: "10px",
                    }}
                    leftSection={<IconBrandGoogleFilled size={12} />}
                    //color=""
                    radius="xl"
                    size="l"
                    onClick={() => signIn("google")}
                >
                    Sign in with Google
                </Button>
                <Space />
            </Flex>
        </Container >
    )
}