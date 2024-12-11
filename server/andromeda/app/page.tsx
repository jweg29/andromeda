"use server"

import { signIn } from "./auth";
import SignIn from "./ui/SignIn";

const App = () => {
  //const { user, login } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Welcome to My Blog App</h1>
      <p>Please log in to continue.</p>
      <SignIn></SignIn>
      <button
        onClick={signIn}
        style={{
          padding: "10px 20px",
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

export default App;