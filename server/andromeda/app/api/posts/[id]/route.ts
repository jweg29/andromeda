import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth/authOptions";

/**
 * 
 * @param request 
 * @param param1 
 * @returns 
 */
export async function PUT(
    request: Request,
    context: { params: { id: string } } // Use the correct type for the context argument
) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Await params before destructuring
        const { id } = await context.params;

        const body = await request.json();
        const { title, content } = body;

        // Check if the journal entry belongs to the logged-in user
        const journalEntry = await prisma.journalEntry.findUnique({
            where: { id: id },
        });

        if (!journalEntry || journalEntry.userId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Update the journal entry
        const updatedEntry = await prisma.journalEntry.update({
            where: { id: id },
            data: {
                title,
                content,
            },
        });

        return NextResponse.json(updatedEntry, { status: 200 });
    } catch (error) {
        console.error("Error updating journal entry:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

/**
 * 
 * @param request 
 * @param param1 
 * @returns 
 */
export async function DELETE(
    request: Request,
    context: { params: { id: string } } // Include `context` for dynamic params
) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Await params before destructuring
        const { id } = await context.params;
        console.log(`Deleting journal entry with id: ${id}`);

        // Check if the journal entry belongs to the logged-in user
        const journalEntry = await prisma.journalEntry.findUnique({
            where: { id: id },
        });

        console.log(`Found journal entry: ${journalEntry.title}`)

        if (!journalEntry || journalEntry.userId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Delete the journal entry
        await prisma.journalEntry.delete({
            where: { id: id },
        });

        return NextResponse.json({ message: "Journal entry deleted successfully" }, { status: 200 });
    } catch (error) {
        if (error != null) {
            console.log(error.stack);
            //console.error("Error deleting journal entry:", error);
        } else {
            console.error("Error deleting journal entry: Unknown error");
        }
        //console.error("Error deleting journal entry:", error ?? "Unknown error");
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}