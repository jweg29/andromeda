import styles from "./Sidebar.module.css";

const Sidebar = ({ posts, onSelectPost }) => {
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
        {posts.map((post) => (
          <li
            key={post.id}
            className={styles["sidebar-item"]}
            // style={{
            //   color: "rgba(50, 48, 43, 1)",
            //   margin: "0px",
            //   padding: "10px",
            //   cursor: "pointer",
            //   backgroundColor: "white",
            //   fontFamily: "sans-serif",
            //   fontSize: "14px",
            //   fontWeight: 500,
            //   '&:hover': { backgroundColor: 'red' }
            // }}
            onClick={() => onSelectPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div >
  );
};

export default Sidebar;