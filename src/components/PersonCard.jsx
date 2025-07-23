import { Card } from "react-bootstrap";
import pellicola from "../assets/pellicola.jpg";
import "../styles/Card.css";

export default function PersonCard({ card }) {
  const getBorderStyle = (rarity) => {
    switch (card.rarity) {
      case "COMMON":
        return "5px solid white";
      case "RARE":
        return "5px solid gray";
      case "EPIC":
        return "5px solid gold";
      default:
        return "1px solid gray";
    }
  };

  return (
    <Card
      className="text-black"
      style={{
        border: getBorderStyle(card.rarity),
        borderRadius: "20px",
        height: "100%",
        fontFamily: "'Lobster', cursive",
        backgroundImage: `url(${pellicola})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(2px)",
        position: "relative",
      }}
    >
      {card.imageUrl && (
        <Card.Img
          variant="top"
          src={card.imageUrl}
          alt={card.name}
          style={{
            height: "200px",
            objectFit: "cover",
          }}
        />
      )}

      <Card.Body
        className="m-auto align-items-center px-3"
        style={{
          color: "black",
          borderRadius: "12px",
        }}
      >
        <Card.Title className="text-center">{card.name}</Card.Title>
        <ul
          className="px-5"
          style={{
            fontFamily: "Roboto, sans-serif",
            listStyleType: "none",
          }}
        >
          <li>
            <strong>Descrizione:</strong> <span>{card.description}</span>
          </li>
          <li>
            <strong>Data di nascita:</strong> <span>{card.bornDate}</span>
          </li>
          <li>
            <strong>Filmografia:</strong>
            <ul style={{ paddingLeft: "1rem" }}>
              {Array.isArray(card.filmography) ? (
                card.filmography.map((film, index) => (
                  <li key={index}>
                    <span>{film}</span>
                  </li>
                ))
              ) : (
                <li>
                  <span>{card.filmography}</span>
                </li>
              )}
            </ul>
          </li>
        </ul>
      </Card.Body>
      <div className={`card-rarity-badge ${card.rarity.toLowerCase()}`}>
        {card.rarity}
      </div>
    </Card>
  );
}
