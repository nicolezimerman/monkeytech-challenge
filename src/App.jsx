import { useState } from "react";
import "./App.css";
import { RIDES } from "./mock-data/mock-data";
import Cube from "./components/Cube/Cube";
import HeaderInfo from "./components/HeaderInfo/HeaderInfo";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header>
        <h2>The Jungle™ FastRider Service </h2>
      </header>
      <main>
        <HeaderInfo />
        {/* TO DO: <searchBar></searchBar>*/}
        <button>SUBMIT</button>
        <div className="cubes-container">
          {RIDES.map((ride) => (
            <Cube ride={ride} key={ride.id} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
