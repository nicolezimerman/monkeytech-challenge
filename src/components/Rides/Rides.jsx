import "./Rides.css";
import Cube from "../Cube/Cube";

export function Rides({ rides }) {
  return (
    <div className="rides-container">
      {rides.map((ride) => (
        <Cube ride={ride} key={ride.id} />
      ))}
    </div>
  );
}
