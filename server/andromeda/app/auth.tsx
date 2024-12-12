/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                console.log("DEBUG: signIn callback")
                console.log(`DEBUG: user signedIn: ${user.name}, ${user.email}`)

                // Save or update the user in the database
                console.log("DEBUG: searching for existing user...")
                const existingUser = await prisma.User.findUnique({
                    where: { email: user.email },
                });

                if (!existingUser) {
                    console.log("DEBUG: no existing user found")
                    // Create a new user if they don't exist
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        },
                    });
                } {
                    console.log(`DEBUG: existing user found: ${existingUser.name}, ${existingUser.email}`)
                }

                return true; // Allow the sign-in
            } catch (error) {
                console.error("signIn error")
                if (error) {
                    console.error("Error:", error);
                }
                //console.error("Error saving user to the database", error);
                return false; // Reject the sign-in
            }
        },
        async session({ session, user, token }) {
            // Add user ID to the session object
            console.log("DEBUG: session callback")
            if (token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true, // Enable debug mode
});

export const login = async () => {
    // Simulate login request to API
    const user = { id: 1, name: "John Doe", email: "john@example.com" }; // Replace with API response
    localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage (or cookies)
    return user;
};

export const logout = async () => {
    // Simulate logout
    localStorage.removeItem("user");
};

export const getUser = () => {
    // Get user from localStorage (or cookies)
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};