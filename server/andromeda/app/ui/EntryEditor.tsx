/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { ActionIcon, Flex, Input, Space, Tooltip } from "@mantine/core";
import { showNotification, updateNotification } from '@mantine/notifications';
import { Link, RichTextEditor } from '@mantine/tiptap';
import '@mantine/tiptap/styles.css';
import { JournalEntry } from "@prisma/client";
import { IconDeviceFloppy, IconTrash } from '@tabler/icons-react';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import styles from "./EntryEditor.module.css";

export interface JournalEntryData {
    title: string,
    content: string,
}

interface EntryEditorProps {
    selectedJournalEntry: JournalEntry | null;
    shouldCreateNewJournal: boolean;
    onDelete: (entryId: string) => void;
    onUpdate: (updatedEntry: JournalEntry) => void;
    onCreate: (newEntry: JournalEntry) => void;
    setIsPerformingAction: (perfomingAction: boolean) => void;
}

const EntryEditor = ({ selectedJournalEntry, shouldCreateNewJournal, onDelete, onUpdate, onCreate }: EntryEditorProps) => {
    const [title, setTitle] = useState(selectedJournalEntry?.title);
    const [content, setContent] = useState(selectedJournalEntry?.content);

    const initialContent = selectedJournalEntry?.content
    const contentEditor = useEditor({
        extensions: [StarterKit, Link, Underline],
        content: initialContent,
        onUpdate: ({ editor }) => {
            console.log(`contentEditor onUpdate`)
            setContent(editor.getHTML());
        },
    });

    useEffect(() => {
        if (shouldCreateNewJournal) {
            setTitle("");
            contentEditor?.commands.setContent("What's on your mind?");
            setContent("What's on your mind?");
        } else if (title != selectedJournalEntry?.title) {
            // update title and content if the journal entry changes
            setTitle(selectedJournalEntry?.title);
            const newContent = selectedJournalEntry?.content;
            contentEditor?.commands.setContent(newContent || '');
            setContent(selectedJournalEntry?.content);
        }
    }, [selectedJournalEntry, shouldCreateNewJournal]);

    const deleteEntry = async (journalId: string) => {
        try {
            const res = await fetch(`/api/posts/${journalId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                onDelete(journalId);
            } else {
                console.error("Failed to delete entry");
            }
        } catch (error) {
            console.error("Error deleting entry:", error);
        }
    };

    const createEntry = async () => {
        try {
            if (!title) {
                console.error(`Attempted to create entry with Null newJournalData`)
                return;
            }

            //const { title, content } = newJournalData as JournalEntryData;
            console.log(`createEntry: ${title}, ${content}`)

            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (!res.ok) {
                throw new Error("Failed to create entry");
            }
            const newEntry = await res.json();
            onCreate(newEntry);
            console.log("New entry created:", newEntry);
        } catch (error) {
            console.error("Error updating entry:", error);
        }
    }

    const updateEntry = async (journalId: string) => {
        const notificationId = 'update-journal-entry';

        showNotification({
            id: notificationId,
            title: 'Saving post',
            message: 'Your post is being saved...',
            loading: true,
        });

        try {
            console.log(`updatedEntry: ${title}, ${content}`)
            const res = await fetch(`/api/posts/${selectedJournalEntry?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (res.ok) {
                updateNotification({
                    id: notificationId,
                    title: 'Success',
                    message: 'Post saved!',
                    color: 'green',
                    loading: false,
                });
                const updatedEntry = await res.json();
                onUpdate(updatedEntry);
            } else {
                console.error("Failed to update entry");
                updateNotification({
                    id: notificationId,
                    title: 'Error',
                    message: 'Failed to save post. Please try again.',
                    color: 'red',
                    loading: false,
                });
            }
        } catch (error) {
            console.error("Error updating entry:", error);
        }
    }

    return (
        <div style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "white",
        }}>
            <Flex
                justify="flex-end"
                align="center"
                direction="row"
                wrap="wrap"
            >
                <Tooltip label="Save journal">
                    <ActionIcon
                        disabled={selectedJournalEntry == null && (title == null || title == '')}
                        size="md"
                        variant="filled"
                        aria-label="Settings"
                        onClick={(event) => {
                            if (selectedJournalEntry) {
                                updateEntry(selectedJournalEntry?.id)
                            } else {
                                createEntry()
                            }
                        }}
                    >
                        <IconDeviceFloppy
                            style={{
                                width: '70%',
                                height: '70%'
                            }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>


                <Space w="sm"></Space>

                <Tooltip label="Delete journal">
                    <ActionIcon
                        disabled={selectedJournalEntry == null}
                        size="md"
                        variant="filled"
                        color="violet.3"
                        aria-label="Settings"
                        onClick={(event) => {
                            if (!selectedJournalEntry) {
                                return;
                            }
                            deleteEntry(selectedJournalEntry?.id)
                        }}
                    >
                        <IconTrash
                            style={{
                                width: '70%',
                                height: '70%'
                            }}
                            stroke={1.5} />
                    </ActionIcon>
                </Tooltip>

            </Flex>

            <Space h="sm"></Space>

            <Input
                size="xl"
                radius="xs"
                placeholder="Title"
                value={title}
                onChange={(event) => {
                    console.log(`title Input onChange`)
                    setTitle(event.currentTarget.value);
                }}
            />

            <Space h="lg"></Space>

            <RichTextEditor
                editor={contentEditor}
                className={styles["editor"]}
            >
                <RichTextEditor.Toolbar
                    sticky
                    stickyOffset={0}>
                    < RichTextEditor.ControlsGroup >
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Link />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup >
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup >
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup >
                        <RichTextEditor.ClearFormatting />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <BubbleMenu editor={contentEditor}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Link />
                    </RichTextEditor.ControlsGroup>
                </BubbleMenu>

                <RichTextEditor.Content
                    className={styles["editor-content"]}
                />
            </RichTextEditor >
        </div >
    );
};

export default EntryEditor;
