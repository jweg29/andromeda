/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import JournalView from '@/ui/MainView';
import { JournalEntry } from '@prisma/client';
import { useEffect, useState } from "react";
import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";

const Dashboard = () => {
    const [journalEntries, setJournalEntries] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchJournalEntries() {
            try {
                const res = await fetch("/api/posts");
                if (!res.ok) {
                    throw new Error("Failed to fetch journal entries");
                }
                const data = await res.json();
                setJournalEntries(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchJournalEntries();
    }, []);

    /*useState([
        {
            id: 0,
            userId: 0,
            title: "Hello World",
            content: "Hi there! The beginning of a new world! So exciting. Can't wait.",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
        {
            id: 1,
            userId: 0,
            title: "Returning from Patagonia",
            content: "Such an amazing advneture. wow so much fun. endless landscapes. pictruesqe views and scenes. moutnains. waterfalls. hiking and trekking.",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
        {
            id: 2,
            userId: 0,
            title: "Sweeping up feelings",
            content: "Breakups suck.",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
        {
            id: 3,
            userId: 0,
            title: "Mapo Tofu recipe",
            content: "Tofu. peppers. pepper paste. garlic. green onion. sesame oil. fried pork.",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
        {
            id: 4,
            userId: 0,
            title: "12/11 Therapy session",
            content: "Hi there! Today was quite the day. oh wow. asdflasdfj alsdf.asdf la;sdjfasd.f \nasdfjjasdf;a sdf.asdf asdf;aslkdj",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
        {
            id: 5,
            userId: 0,
            title: "Mushroom trip",
            content: "🍄🍄🍄🍄🍄🍄 don't know how to explain it. but they creat such an interesting experience.",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
        {
            id: 6,
            userId: 0,
            title: "Making Andromeda",
            content: "This is so cool! frustrating. but cool too. like to make something that actually works is very satisfying.",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
        {
            id: 7,
            userId: 0,
            title: "CSS is a pain",
            content: "It's hard to learn and i don't get it. web developmetn and react too.",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
    ]);*/

    const [selectedJournalEntry, setSelectedJournalEntry] = useState<JournalEntry | null>(null);

    const handleSelectJournalEntry = (journalEntry: JournalEntry) => {
        console.log(`Selected journal entry: ${journalEntry.title}`);
        setSelectedJournalEntry(journalEntry);
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
            <Navbar />
            <div style={{ display: "flex", flex: 1 }}>
                <Sidebar posts={journalEntries} onSelectPost={handleSelectJournalEntry} />
                <JournalView journalEntry={selectedJournalEntry}></JournalView>
            </div>
        </div>
    );
};

export default Dashboard;