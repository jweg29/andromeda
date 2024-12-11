import React from "react";

const Navbar = () => {
    const handleLogin = () => {
        console.log("Login button clicked!");
        // Implement login functionality here
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            backgroundColor: "#282c34",
            color: "white",
        }}>
            <h1 style={{ margin: 0 }}>My Blog</h1>
            <button
                onClick={handleLogin}
                style={{
                    padding: "5px 15px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#61dafb",
                    color: "black",
                    cursor: "pointer",
                }}
            >
                Login
            </button>
        </div>
    );
};

export default Navbar;