import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

/**
 * 
 * @returns 
 */
export async function GET() {
    // Get the current session
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Fetch journal entries for the logged-in user
        const userId = session.user.id; // Ensure the session includes the user ID

        const journalEntries = await prisma.journalEntry.findMany({
            where: {
                userId, // Only fetch entries belonging to the current user
            },
            orderBy: {
                createdAt: "desc", // Optional: Order by creation date
            },
        });

        return NextResponse.json(
            journalEntries,
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error('Error fetching Journal Entires:', error);
        return NextResponse.json(
            { error: 'Failed to fetch journal entries' },
            {
                status: 500,
            }
        );
    }
}