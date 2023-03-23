import "./Rides.css";
import Cube from "../Cube/Cube";

export function Rides({ rides, selectRide, selected }) {
  return (
    <div className="rides-container">
      {rides.map((ride) => (
        <Cube
          ride={ride}
          key={ride.id}
          selectRide={selectRide}
          selected={ride.id == selected}
        />
      ))}
    </div>
  );
}
