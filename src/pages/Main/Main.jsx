import "./Main.css";
import { useState } from "react";
import HeaderInfo from "../../components/HeaderInfo/HeaderInfo";
import { useRides } from "../../hooks/useRides";
import { useTickets } from "../../hooks/useTickets";
import Cube from "../../components/Cube/Cube";

function Main() {
  const { rides, loading, error } = useRides();
  const {
    ticket,
    reserveTicket,
    loading: loadingTicket,
    error: errorTicket,
  } = useTickets();

  const [pin, setPin] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);

  const handleSelectRide = (number) => {
    number === selectedRide ? setSelectedRide(null) : setSelectedRide(number);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //TO DO validation and implementation
    if (!selectedRide) alert("You should select a ride first");
    if (!pin) alert("You should enter a PIN");

    await reserveTicket(pin, selectedRide);
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
        {errorTicket && <p style={{ color: "red" }}>{errorTicket}</p>}
      </header>
      <main>
        {/* TO DO check the responsabilities */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="rides">
            {rides.map((ride) => (
              <Cube
                ride={ride}
                key={ride.id}
                selectRide={handleSelectRide}
                selected={ride.id == selectedRide}
              />
            ))}
          </div>
        )}
        {error && <p>{error}</p>}
      </main>
    </div>
  );
}

export default Main;
