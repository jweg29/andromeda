"use client"

import { JournalEntry } from '@prisma/client';
import { useState } from "react";
import MainView from "../ui/MainView";
import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";

const Dashboard = () => {
    const [journalEntries, setJournalEntries] = useState([
        {
            id: 0,
            userId: 0,
            title: "Hello World",
            content: "Hi there! Today was quite the day. oh wow. asdflasdfj alsdf.asdf la;sdjfasd.f \nasdfjjasdf;a sdf.asdf asdf;aslkdj",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
        {
            id: 1,
            userId: 0,
            title: "Returning from Patagonia",
            content: "Hi there! Today was quite the day. oh wow. asdflasdfj alsdf.asdf la;sdjfasd.f \nasdfjjasdf;a sdf.asdf asdf;aslkdj",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
        {
            id: 2,
            userId: 0,
            title: "Sweeping up feelings",
            content: "Hi there! Today was quite the day. oh wow. asdflasdfj alsdf.asdf la;sdjfasd.f \nasdfjjasdf;a sdf.asdf asdf;aslkdj",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
        {
            id: 3,
            userId: 0,
            title: "Mapo Tofu recipe",
            content: "Hi there! Today was quite the day. oh wow. asdflasdfj alsdf.asdf la;sdjfasd.f \nasdfjjasdf;a sdf.asdf asdf;aslkdj",
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
            content: "Hi there! Today was quite the day. oh wow. asdflasdfj alsdf.asdf la;sdjfasd.f \nasdfjjasdf;a sdf.asdf asdf;aslkdj",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
        {
            id: 6,
            userId: 0,
            title: "Making Andromeda",
            content: "Hi there! Today was quite the day. oh wow. asdflasdfj alsdf.asdf la;sdjfasd.f \nasdfjjasdf;a sdf.asdf asdf;aslkdj",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
        {
            id: 7,
            userId: 0,
            title: "CSS is a pain",
            content: "Hi there! Today was quite the day. oh wow. asdflasdfj alsdf.asdf la;sdjfasd.f \nasdfjjasdf;a sdf.asdf asdf;aslkdj",
            date: Date(),
            createdAt: Date(),
            updatedAt: Date(),
        },
    ]);
    const [selectedJournalEntry, setSelectedJournalEntry] = useState(null);

    const handleSelectJournalEntry = (journalEntry: JournalEntry) => {
        setSelectedJournalEntry(journalEntry);
    };

    return (
        <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
            <Navbar />
            <div style={{ display: "flex", flex: 1 }}>
                <Sidebar posts={journalEntries} onSelectPost={handleSelectJournalEntry} />
                <MainView post={selectedJournalEntry} />
            </div>
        </div>
    );
};

export default Dashboard;