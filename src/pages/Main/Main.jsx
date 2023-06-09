import "./Main.css";
import { useState, useEffect } from "react";
import HeaderInfo from "../../components/HeaderInfo/HeaderInfo";
import { useRides } from "../../hooks/useRides";
import { useTickets } from "../../hooks/useTickets";
import Cube from "../../components/Cube/Cube";
import { useNavigate } from "react-router-dom";
import { OPEN_TIME, CLOSE_TIME } from "../../consts/consts";
import { isValidPin, isOpen } from "../../helpers/helpers";

function Main() {
  let navigate = useNavigate();

  const { rides, loading, error } = useRides();
  const {
    reserveTicket,
    loading: loadingTicket,
    error: errorTicket,
  } = useTickets();

  const [pin, setPin] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const [formErrors, setFormErrors] = useState();
  const [showButton, setShowButton] = useState(true);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const savedData = localStorage.getItem("userPin");
    if (savedData) setPin(JSON.parse(savedData).pin);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("rides-section");
      if (section.getBoundingClientRect().top <= window.innerHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    if (isMobile) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSelectRide = (number) => {
    number === selectedRide ? setSelectedRide(null) : setSelectedRide(number);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      localStorage.setItem("userPin", JSON.stringify({ pin: pin }));

      const ticket = await reserveTicket(pin, selectedRide);
      if (ticket) navigate("/detail", { state: { ticket } });
    }
  };

  const validateForm = () => {
    let err = {};

    if (!selectedRide) err.ride = "You should select a ride";
    if (!pin) {
      err.pin = "You should enter a PIN";
    } else {
      const isValid = isValidPin(pin);
      if (!isValid) err.invalidPin = "The pin is invalid";
    }

    setFormErrors({ ...err });
    return Object.keys(err).length < 1;
  };

  const handleChangePin = (event) => {
    const updatedPin = event.target.value;
    setPin(updatedPin);
    setFormErrors({ ...formErrors, pin: "" });
  };

  return (
    <div className="main">
      <main>
        <HeaderInfo />
        {!isOpen(OPEN_TIME, CLOSE_TIME) ? (
          <h3 className="closed">
            {`FastRider cards cannot be issued outside the park's operating hours
            from ${OPEN_TIME} to ${CLOSE_TIME}`}
          </h3>
        ) : (
          <>
            <form className="form" onSubmit={handleSubmit}>
              <input
                className="input"
                placeholder="#PIN"
                onChange={handleChangePin}
                value={pin}
              />
              {showButton && (
                <button type="submit" className="submit">
                  SUBMIT
                </button>
              )}
            </form>
            {errorTicket && <p style={{ color: "red" }}>{errorTicket}</p>}
            {formErrors &&
              Object.values(formErrors).map((err, index) => {
                return (
                  <p key={index} style={{ color: "red" }}>
                    {err}
                  </p>
                );
              })}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="rides" id="rides-section">
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
          </>
        )}
      </main>
    </div>
  );
}

export default Main;
