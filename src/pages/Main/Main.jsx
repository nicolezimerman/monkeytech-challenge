import "./Main.css";
import { useState } from "react";
import HeaderInfo from "../../components/HeaderInfo/HeaderInfo";
import { useRides } from "../../hooks/useRides";
import { useTickets } from "../../hooks/useTickets";
import Cube from "../../components/Cube/Cube";
import { useNavigate } from "react-router-dom";
import { OPEN_TIME, CLOSE_TIME } from "../../consts/consts";

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

  const isOpen = () => {
    const now = new Date();
    const startTime = new Date(now.toDateString() + " " + OPEN_TIME);
    const endTime = new Date(now.toDateString() + " " + CLOSE_TIME);
    const currentTime = now.getTime();
    return (
      currentTime >= startTime.getTime() && currentTime <= endTime.getTime()
    );
  };

  const handleSelectRide = (number) => {
    number === selectedRide ? setSelectedRide(null) : setSelectedRide(number);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      //TO DO see if return error
      const ticket = await reserveTicket(pin, selectedRide);
      navigate("/detail", { state: { ticket } });
    }
  };

  const validateForm = () => {
    let err = {};

    if (!selectedRide) err.ride = "You should select a ride";
    if (!pin) err.pin = "You should enter a PIN";

    // TO DO validate pin:
    /* if(pin){
      const isValidPin = validatePin();
    } */

    setFormErrors({ ...err });
    return Object.keys(err).length < 1;
  };

  const isValidPin = () => {
    let err = false;
    //check the lenght ==15
    if (pin.length != 15) err = true;
    const arr = pin.split("-");
    //check the array have 4 parts
    if (arr.length !== 4) {
      err = true;
      return;
    }
    //check the first part is equal to "JN"
    if (arr[0] != "JN") err = true;

    //check the last part is equal to 2 uppercase letters
    const regexUppercaseLetters = /^[A-Z]{2}$/;
    if (!regexUppercaseLetters.test(arr[3])) err = true;

    //TO DO
    //check the value of each part equal the letter

    return err;
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
        {!isOpen() ? (
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
              <button type="submit" className="submit">
                SUBMIT
              </button>
            </form>
            {formErrors &&
              Object.values(formErrors).map((err) => {
                return <p style={{ color: "red" }}>{err}</p>;
              })}
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
          </>
        )}
      </main>
    </div>
  );
}

export default Main;
