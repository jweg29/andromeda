"use client"

import { Button } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignIn() {

    const { data: session } = useSession()

    if (session) {
        return (
            <>
                <br></br>
                <p>Welcome, {session.user.name}</p>
                <br></br>
                {/* Signed in as {session.user.email} <br /> */}
                <Button onClick={() => signOut()}>
                    Sign out
                </Button>
            </>
        )
    }
    return (
        <>
            <br></br>
            <p>Please sign in to continue</p>
            <br></br>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}