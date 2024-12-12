"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export default function SignIn() {

    const { data: session } = useSession()

    console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
    console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

    if (session) {
        return (
            <>
                {/* Signed in as {session.user.email} <br /> */}
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}