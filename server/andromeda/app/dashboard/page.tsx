/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import MainView from '@/ui/MainView';
import SidebarView from '@/ui/SidebarView';
import { JournalEntry } from '@prisma/client';
import { useEffect, useState } from "react";
import Navbar from "../ui/Navbar";

const Dashboard = () => {
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
    const [error, setError] = useState("");
    const [selectedJournalEntry, setSelectedJournalEntry] = useState<JournalEntry | null>(null);
    const [shouldCreateNewJournal, setShouldCreateNewJournal] = useState<boolean>(false);

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
                if (err instanceof Error) {
                    setError(err.message);
                }
            }
        }

        fetchJournalEntries();
    }, []);

    // Callback to handle delete action
    const handleDelete = (entryId: string) => {
        console.log(`handleDelete: ${entryId}`)
        setJournalEntries((prevEntries) =>
            prevEntries.filter((entry) => entry.id !== entryId)
        );

        if (selectedJournalEntry?.id == entryId) {
            setSelectedJournalEntry(null);
        }
    };

    const handleUpdate = (updatedEntry: JournalEntry) => {
        console.log(`handleUpdate: ${updatedEntry.id}`)
        // replace the old journal entry with the updated one
        const updatedEntries = journalEntries.map((entry) =>
            entry.id === updatedEntry.id ? updatedEntry : entry
        );
        setJournalEntries(updatedEntries);
    };

    const handleCreate = (newEntry: JournalEntry) => {
        console.log(`handleCreate: ${newEntry.id}`)
        setShouldCreateNewJournal(false);
        setSelectedJournalEntry(newEntry);
        setJournalEntries((prevEntries) => [newEntry, ...prevEntries]);
    };

    const handleIsPerformingAction = (setIsPerformingAction: boolean) => {
        console.log(`setIsPerformingAction`)
    };

    const handleSelectJournalEntry = (journalEntry: JournalEntry) => {
        console.log(`Selected journal entry: ${journalEntry.title}`);
        setSelectedJournalEntry(journalEntry);
    };

    const handleCreateJournalEntry = () => {
        setSelectedJournalEntry(null);
        setShouldCreateNewJournal(true);
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
            <Navbar />
            <div style={{ display: "flex", flex: 1 }}>
                <SidebarView
                    posts={journalEntries}
                    onSelectPost={handleSelectJournalEntry}
                    onCreateNewPost={handleCreateJournalEntry} />
                <MainView
                    journalEntry={selectedJournalEntry}
                    shouldCreateNewJournal={shouldCreateNewJournal}
                    onDelete={handleDelete}
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    setIsPerformingAction={handleIsPerformingAction}></MainView>
            </div>
        </div>
    );
};

export default Dashboard;