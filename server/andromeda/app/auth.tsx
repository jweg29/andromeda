import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
})

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