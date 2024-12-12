"use client"

import { SessionProvider } from "next-auth/react"
import SignIn from "./SignIn"

export default function WelcomeSignIn() {
    return (
        <SessionProvider>
            <SignIn></SignIn>
        </SessionProvider>
    )
}