
const MainView = ({ post }) => {
    if (!post) {
        return (
            <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
                <h2 style={
                    {
                        fontFamily: "Inter",
                        fontWeight: 300,
                        color: "white"
                    }
                }
                >select a journal</h2>
            </div>
        );
    }

    return (
        <div style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "white",
        }}>
            <h2 style=
                {{
                    color: "rgba(55, 53, 48, 1)",
                }}
            >{post.title}</h2>
            <p style=
                {{
                    color: "rgba(55, 53, 48, 1)",
                }}
            >{post.content}</p>
        </div>
    );
};

export default MainView;