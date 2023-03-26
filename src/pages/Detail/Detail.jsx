import "./Detail.css";
import checkIcon from "../../assets/check.png";
import { useLocation } from "react-router-dom";

function Detail() {
  const location = useLocation();
  const { ticket } = location.state;
  const { ride, accessCode, returnTime } = ticket;

  return (
    <div className="detail-container">
      <img alt="Check" className="big-icon" src={checkIcon} />
      <p>
        Thank you for using The Jungle™ FastRider ticket system - your access
        code is now ready!
      </p>
      <div
        className="ticket-data"
        style={{
          borderColor: ride.zone.color,
        }}
      >
        <div className="ride-info">
          <p className="name">{ride.name}</p>
          <p>{ride.zone.name}</p>
        </div>

        <div>
          <div className="ticket-info">
            <h4>Return at</h4>
            <h2>
              {new Date(returnTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </h2>
          </div>
          <div className="ticket-info">
            <h4>Use access code</h4>
            <h2>{accessCode}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
