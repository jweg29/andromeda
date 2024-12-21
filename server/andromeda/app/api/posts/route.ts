import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth/authOptions";

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
        if (error instanceof Error) {
            console.error('Error fetching Journal Entires:', error.message);
        } else {
            console.error('Error fetching Journal Entires:', error);
        }
        return NextResponse.json(
            { error: 'Failed to fetch journal entries' },
            {
                status: 500,
            }
        );
    }
}

/**
 * 
 * @returns 
 */
export async function POST(request: Request) {
    // Get the current session
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        //const rawBody = await request.text();
        //console.log("Raw request body:", rawBody);

        // Parse the request body
        const { title, content } = await request.json();
        console.log(`request title: ${title}`)
        console.log(`request content: ${content}`)

        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            );
        }

        // Create a new journal entry
        const newEntry = await prisma.journalEntry.create({
            data: {
                title,
                content,
                userId: session.user.id, // Associate the entry with the logged-in user
            },
        });

        // Return the created journal entry
        return NextResponse.json(newEntry, { status: 201 });

    } catch (error) {
        console.error("Error creating journal entry:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
