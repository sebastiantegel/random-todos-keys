import "./App.css";
import { GenerateKey } from "./components/GenerateKey";
import { GetKey } from "./components/GetKey";

function App() {
  return (
    <>
      <div className="wrapper">
        <GenerateKey />
        <GetKey />
      </div>
    </>
  );
}

export default App;
