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