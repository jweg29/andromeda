import React from "react";

const MainView = ({ post }) => {
    if (!post) {
        return (
            <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
                <h2>Select a post to view its content</h2>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, padding: "20px" }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
};

export default MainView;