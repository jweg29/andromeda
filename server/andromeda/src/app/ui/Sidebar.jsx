import React from "react";

const Sidebar = ({ posts, onSelectPost }) => {
  return (
    <div style={{
      width: "250px",
      borderRight: "1px solid #ccc",
      padding: "10px",
      overflowY: "auto",
    }}>
      <h3>Posts</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #ddd",
            }}
            onClick={() => onSelectPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;