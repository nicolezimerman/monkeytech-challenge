import "./Cube.css";
import clockIcon from "../../assets/clock-grey.png";
import ticketIcon from "../../assets/ticket-grey.png";

const Cube = ({
  ride: { id, zone, name, remainingTickets, returnTime },
  selectRide,
  selected,
}) => {
  const handleOnClick = () => {
    selectRide(id);
  };
  return (
    <div
      className="cube"
      style={{
        borderColor: zone.color,
        backgroundColor: selected && zone.color,
      }}
      onClick={handleOnClick}
    >
      <p className="zone">{zone.name}</p>
      <p className="name">{name}</p>
      <div className="ride-info">
        <div className="data">
          <img className="icon" src={clockIcon} alt="Clock icon" />
          {new Date(returnTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <div className="data">
          <img className="icon" src={ticketIcon} alt="Ticket icon" />
          {remainingTickets}
        </div>
      </div>
    </div>
  );
};

export default Cube;
