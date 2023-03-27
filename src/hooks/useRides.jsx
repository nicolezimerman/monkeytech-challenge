import { useEffect, useState } from "react";
import { API_RIDES } from "../consts/consts";
import { OPEN_TIME, CLOSE_TIME } from "../consts/consts";
import { isOpen } from "../helpers/helpers";

const TOKEN = import.meta.env.VITE_API_TOKEN;

export function useRides() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mappedRides = rides.map((ride) => ({
    id: ride.id,
    zone: { id: ride.zone.id, name: ride.zone.name, color: ride.zone.color },
    name: ride.name,
    remainingTickets: ride.remaining_tickets,
    returnTime: ride.return_time,
  }));

  const getRides = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_RIDES}?token=${TOKEN}`);
      const json = await res.json();
      setRides(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen(OPEN_TIME, CLOSE_TIME)) getRides();
  }, []);

  return { rides: mappedRides, getRides, loading, error };
}
