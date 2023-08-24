import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Authenticated, UserContext } from "./components/Authenticated";
import { UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Authenticated>
        <Clicker />
      </Authenticated>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

const Clicker = () => {
  const [count, setCount] = useState(0);
  const user = useContext(UserContext);
  return (
    <div className="card">
      <UserButton />
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      Hi {user?.name}!
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
};
