import WelcomeSignIn from "./ui/WelcomeSignIn";

const App = () => {
  //const { user, login } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Welcome to My Blog App</h1>
      <p>Please log in to continue.</p>
      <WelcomeSignIn></WelcomeSignIn>
    </div>
  );
};

export default App;