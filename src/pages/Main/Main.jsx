import "./Main.css";
import { useState } from "react";
import HeaderInfo from "../../components/HeaderInfo/HeaderInfo";
import { Rides } from "../../components/Rides/Rides";
import { useRides } from "../../hooks/useRides";

function Main() {
  const [pin, setPin] = useState("");
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

  const handleChangePin = (event) => {
    const updatedPin = event.target.value;
    setPin(updatedPin);
  };

  return (
    <div className="main">
      <header>
        <h2>The Jungle™ FastRider Service </h2>
        <HeaderInfo />
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="#PIN"
            onChange={handleChangePin}
            value={pin}
          />
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

export default Main;
