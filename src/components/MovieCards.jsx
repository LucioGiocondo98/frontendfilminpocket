import { Card } from "react-bootstrap";

export default function MovieCardComponent({ card }) {
  const getBorderStyle = (rarity) => {
    switch (rarity) {
      case "COMMON":
        return "2px solid white";
      case "RARE":
        return "2px solid silver";
      case "EPIC":
        return "2px solid gold";
      default:
        return "1px solid gray";
    }
  };

  const getBackgroundColor = (rarity) => {
    switch (rarity) {
      case "COMMON":
        return "#1e1e1e";
      case "RARE":
        return "#2f2f2f";
      case "EPIC":
        return "#3e2e00";
      default:
        return "#1e1e1e";
    }
  };

  return (
    <Card
      className="mb-4"
      style={{
        border: getBorderStyle(card.rarity),
        borderRadius: "20px",
        backgroundColor: getBackgroundColor(card.rarity),
        color: "white",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Card.Img
        variant="top"
        src={card.imageUrl}
        alt={card.name}
        style={{
          borderRadius: "20px 20px 0 0",
          objectFit: "cover",
          height: "200px",
          zIndex: 10,
          position: "relative",
        }}
      />
      <Card.Body style={{ zIndex: 10, position: "relative" }}>
        <Card.Title>{card.name}</Card.Title>
        <ul className="ps-3" style={{ listStyleType: "none" }}>
          <li>
            <strong>Anno:</strong> {card.filmReleaseYear}
          </li>
          <li>
            <strong>Genere:</strong> {card.genre}
          </li>
          <li>
            <strong>Regista:</strong> {card.directorName}
          </li>
          <li>
            <strong>Descrizione:</strong> {card.description}
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
}
