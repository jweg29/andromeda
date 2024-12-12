import WelcomeSignIn from "./ui/WelcomeSignIn";

const App = () => {
  //const { user, login } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "14vh" }}>
      <h1>Welcome to Adromeda ✨</h1>
      <WelcomeSignIn></WelcomeSignIn>
    </div>
  );
};

export default App;