import { Button } from "@mantine/core";
import { JournalEntry } from "@prisma/client";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  posts: JournalEntry[];
  onSelectPost: (post: JournalEntry) => void;
  onCreateNewPost: () => void;
}

const SidebarView = ({ posts, onSelectPost, onCreateNewPost }: SidebarProps) => {
  return (
    <div style={{
      width: "250px",
      borderRight: "1px solid rgba(242, 242, 241, 1)",
      //padding: "10px",
      overflowY: "auto",
      backgroundColor: "rgba(248, 248, 247, 1)",
    }}>
      {/* <h3 style={{
        fontFamily: "Inter",
        fontWeight: 500,
        color: "white"
      }}>Posts</h3> */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style=
          {{
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            marginBottom: "10px",
            textAlign: "center",
          }}>
          <Button
            radius={40}
            onClick={onCreateNewPost}
          >
            New Journal
          </Button>
        </li>

        {posts.map((post) => (
          <li
            key={post.id}
            className={styles["sidebar-item"]}
            onClick={() => onSelectPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div >
  );
};

export default SidebarView;