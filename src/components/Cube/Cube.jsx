import "./Cube.css";
import clockIcon from "../../assets/clock-grey.png";
import ticketIcon from "../../assets/ticket-grey.png";

const Cube = ({ ride: { id, zone, name, remaining_tickets, return_time } }) => {
  return (
    <div className="cube" style={{ borderColor: zone.color }}>
      <h4>{zone.name}</h4>
      <h2>{name}</h2>
      <div className="info">
        <div className="time">
          <img className="icon" src={clockIcon} alt="Clock icon" />
          {new Date(return_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <div className="tickets">
          <img className="icon" src={ticketIcon} alt="Ticket icon" />
          {remaining_tickets}
        </div>
      </div>
    </div>
  );
};

export default Cube;
