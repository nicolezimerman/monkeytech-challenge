import "./App.css";
import HeaderInfo from "./components/HeaderInfo/HeaderInfo";
import { Rides } from "./components/Rides/Rides";
import { useRides } from "./hooks/useRides";

function App() {
  const { rides, loading, error } = useRides();

  return (
    <div className="App">
      <header>
        <h2>The Jungle™ FastRider Service </h2>
        <HeaderInfo />
        <form className="form">
          <input placeholder="#PIN" />
          <button type="submit">SUBMIT</button>
        </form>
      </header>
      <main>
        {loading ? <p>Loading...</p> : <Rides rides={rides} />}
        {error && <p>{error}</p>}
      </main>
    </div>
  );
}

export default App;
