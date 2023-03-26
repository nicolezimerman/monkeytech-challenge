import { useState } from "react";
import { API_TICKETS } from "../consts/consts";
const TOKEN = import.meta.env.VITE_API_TOKEN;

export function useTickets() {
  const [ticket, setTicketData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mapTicket = async (ticket) => {
    return {
      id: ticket.id,
      ride: {
        id: ticket.ride.id,
        zone: {
          id: ticket.ride.zone.id,
          name: ticket.ride.zone.name,
          color: ticket.ride.zone.color,
        },
        name: ticket.ride.name,
        remainingTickets: ticket.ride.remaining_tickets,
        returnTime: ticket.ride.return_time,
      },
      accessCode: ticket.access_code,
      returnTime: ticket.return_time,
    };
  };

  const reserveTicket = async (pin, ride) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API_TICKETS, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new URLSearchParams({
          pin: pin,
          ride_id: ride,
          token: TOKEN,
        }),
      });

      // TO DO see how to show error if needed
      if (res.status == 200) {
        const json = await res.json();
        const ticketMapped = await mapTicket(json);
        setTicketData(ticketMapped);
        return ticketMapped;
      } else {
        setError(json);
        return json;
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { reserveTicket, ticket, loading, error };
}
