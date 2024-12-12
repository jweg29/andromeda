import { SessionProvider } from "next-auth/react";
import SignIn from "./ui/SignIn";

const App = () => {
  //const { user, login } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Welcome to My Blog App</h1>
      <p>Please log in to continue.</p>
      <SessionProvider>
        <SignIn></SignIn>
      </SessionProvider>
    </div>
  );
};

export default App;