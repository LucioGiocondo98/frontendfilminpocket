import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const TicketCounter = () => {
  const { accessToken } = useAuth();
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    fetch("http://localhost:8080/users/me/tickets", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel recupero ticket");
        }
        return res.json();
      })
      .then((data) => setTickets(data.filmTickets))
      .catch((err) => {
        console.error("Errore durante il recupero dei ticket:", err);
      });
  }, [accessToken]);

  return (
    <div className="ticket-counter">
      🎟️ Ticket disponibili:{" "}
      <strong>{tickets !== null ? tickets : "Caricamento..."}</strong>
    </div>
  );
};

export default TicketCounter;
