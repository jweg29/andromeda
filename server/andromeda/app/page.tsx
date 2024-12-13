
import { Button } from "@mantine/core";
import WelcomeSignIn from "./ui/WelcomeSignIn";

const App = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "14vh" }}>
      <h1>Welcome to Andromeda ✨</h1>
      <WelcomeSignIn></WelcomeSignIn>
      <div style={{ padding: "20px" }}>
        <Button variant="filled" color="violet">Click Me</Button>
      </div>
    </div>
  );
};

export default App;