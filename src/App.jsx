import "./App.css";
import HeaderInfo from "./components/HeaderInfo/HeaderInfo";
import { Rides } from "./components/Rides/Rides";
import { useRides } from "./hooks/useRides";
import { useState } from "react";

function App() {
  const { rides, loading, error } = useRides();
  const [selectedRide, setSelectedRide] = useState(null);

  const handleSelectRide = (number) => {
    number === selectedRide ? setSelectedRide(null) : setSelectedRide(number);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //TO DO validation and implementation
    if (!selectedRide) alert("You should select a ride first");
  };

  return (
    <div className="App">
      <header>
        <h2>The Jungle™ FastRider Service </h2>
        <HeaderInfo />
        <form className="form" onSubmit={handleSubmit}>
          <input placeholder="#PIN" />
          <button type="submit" className="submit">
            SUBMIT
          </button>
        </form>
      </header>
      <main>
        {/* TO DO check the responsabilities */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Rides
            rides={rides}
            selectRide={handleSelectRide}
            selected={selectedRide}
          />
        )}
        {error && <p>{error}</p>}
      </main>
    </div>
  );
}

export default App;
