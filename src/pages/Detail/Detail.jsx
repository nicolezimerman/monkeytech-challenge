import "./Detail.css";
import checkIcon from "../../assets/check.png";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../../components/Icon/Icon";

function Detail() {
  const location = useLocation();
  let navigate = useNavigate();

  const { ticket } = location.state;

  if (!ticket) {
    navigate("/", { replace: true });
  }

  return (
    <div className="detail-container">
      <Icon>
        <img alt="Check" className="big-icon" src={checkIcon} />
      </Icon>
      <p>
        Thank you for using The Jungle™ FastRider ticket system - your access
        code is now ready!
      </p>
      <div
        className="ticket-data"
        style={{
          borderColor: ticket.ride.zone.color,
        }}
      >
        <div className="ride-info">
          <p className="ride-name">{ticket.ride.name}</p>
          <p>{ticket.ride.zone.name}</p>
        </div>

        <div>
          <div className="ticket-info">
            <h4>Return at</h4>
            <h2>
              {new Date(ticket.returnTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </h2>
          </div>
          <div className="ticket-info">
            <h4>Use access code</h4>
            <h2>{ticket.accessCode}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
