/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { ActionIcon, Flex, Space, Tooltip } from "@mantine/core";
import { useForm } from '@mantine/form';
import { Link, RichTextEditor } from '@mantine/tiptap';
import '@mantine/tiptap/styles.css';
import { JournalEntry } from "@prisma/client";
import { IconDeviceFloppy, IconTrash } from '@tabler/icons-react';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
import styles from "./EntryEditor.module.css";

interface PostData {
    title: string;
    content: string;
}

interface EntryEditorProps {
    initialJournalEntry: JournalEntry | null;
}

const EntryEditor: React.FC<EntryEditorProps> = ({ initialJournalEntry }) => {
    const form = useForm({
        initialValues: {
            post: initialJournalEntry
        },
        validate: {
            /*title: (initialJournalEntry?.title) => (value.trim().length > 0 ? null : 'Title is required'),
                content: (initialJournalEntry?.content) => (value.trim().length > 0 ? null : 'Content is required'),*/
        },
    });

    const deleteEntry = async (journalId: string) => {
        try {
            const res = await fetch(`/api/posts/${journalId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                //setJournalEntries((prev) => prev.filter((entry) => entry.id !== id));
            } else {
                console.error("Failed to delete entry");
            }
        } catch (error) {
            console.error("Error deleting entry:", error);
        }
    };

    const saveEntry = async (journalId: string) => {
        try {
            const res = await fetch(`/api/posts/${journalId}`, {
                method: "POST",
            });

            if (res.ok) {
                //setJournalEntries((prev) => prev.filter((entry) => entry.id !== id));
            } else {
                console.error("Failed to save entry");
            }
        } catch (error) {
            console.error("Error saving entry:", error);
        }
    }

    const title = initialJournalEntry?.title;
    const titleEditor = useEditor({
        extensions: [StarterKit],
        title,
        onUpdate: ({ titleEditor }) => {
            console.log(`titleEditor onChange`);
        },
    });

    const content = initialJournalEntry?.content;
    const contentEditor = useEditor({
        extensions: [StarterKit, Link, Underline],
        content,
        onUpdate: ({ editor }) => {
            console.log(`contentEditor onChange`);
        },
    });

    useEffect(() => {
        if (initialJournalEntry) {
            console.log(`post ${initialJournalEntry}`)
            console.log(`post ${initialJournalEntry.title}`)
            //form.setValues(initialJournalEntry)
            titleEditor?.commands.setContent(initialJournalEntry.title)
            contentEditor?.commands.setContent(initialJournalEntry.content)
            //form.setValues(initialPostData);
            //editor?.commands.setContent(initialPostData.content);
        }
    }, [initialJournalEntry, titleEditor, contentEditor]);

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
                        size="md"
                        variant="filled"
                        aria-label="Settings"
                        onClick={(event) => saveEntry(initialJournalEntry?.id)}
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
                        size="md"
                        variant="filled"
                        color="gray.5"
                        aria-label="Settings"
                        onClick={(event) => deleteEntry(initialJournalEntry?.id)}
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

            {/* <TextInput
                size="lg"
                style={{
                }}
                value={post.title}
                placeholder="Title"
            /> */}

            {/* <h2 style=
                {{
                    color: "rgba(55, 53, 48, 1)",
                }}
            >{post.title}</h2> */}

            <RichTextEditor
                editor={titleEditor}
            >
                <RichTextEditor.Content
                    className={styles["editor-title"]}
                />
            </RichTextEditor>

            <Space h="lg"></Space>

            <RichTextEditor
                editor={contentEditor}
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
