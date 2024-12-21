import '@mantine/tiptap/styles.css';
import { JournalEntry } from '@prisma/client';
import EntryEditor from './EntryEditor';

interface MainViewProps {
    journalEntry: JournalEntry | null;
    shouldCreateNewJournal: boolean
    onDelete: (entryId: string) => void;
    onUpdate: (updatedEntry: JournalEntry) => void;
    onCreate: (newEntry: JournalEntry) => void;
    setIsPerformingAction: (perfomingAction: boolean) => void;
}

const MainView = ({ journalEntry, shouldCreateNewJournal, onDelete, onUpdate, onCreate, setIsPerformingAction }: MainViewProps) => {
    if (!journalEntry && !shouldCreateNewJournal) {
        return (
            <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
                <h2 style={
                    {
                        fontFamily: "Inter",
                        fontWeight: 400,
                        color: "white"
                    }
                }
                >Select a journal</h2>
            </div>
        );
    } else {
        return (
            <EntryEditor
                selectedJournalEntry={journalEntry}
                shouldCreateNewJournal={shouldCreateNewJournal}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onCreate={onCreate}
                setIsPerformingAction={setIsPerformingAction} >
            </EntryEditor>
        )
    }
};

export default MainView;