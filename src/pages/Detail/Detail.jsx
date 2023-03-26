import "./Detail.css";
import checkIcon from "../../assets/check.png";
import TICKET from "../../mock-data/ticket-response";
import { useLocation } from "react-router-dom";

function Detail() {
  const location = useLocation();
  const { ticket } = location.state;
  const { id, ride, accessCode, returnTime } = ticket;

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
        <div>
          <h4>{ride.name}</h4>
          <h4>{ride.zone.name}</h4>
        </div>

        <div>
          <div>
            <h4>Return at</h4>
            <h2>
              {new Date(returnTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </h2>
          </div>
          <div>
            <h4>Use access code</h4>
            <h2>{accessCode}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
