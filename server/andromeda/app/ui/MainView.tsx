import '@mantine/tiptap/styles.css';
import { JournalEntry } from '@prisma/client';
import EntryEditor from './EntryEditor';

interface MainViewProps {
    journalEntry: JournalEntry | null;
}

const MainView: React.FC<MainViewProps> = ({ journalEntry }) => {
    if (!journalEntry) {
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
            <EntryEditor initialJournalEntry={journalEntry}></EntryEditor>
        )
    }
};

export default MainView;