import { Card } from "react-bootstrap";

export default function MovieCard({ card }) {
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

  return (
    <Card
      className="mb-4 text-white"
      style={{
        border: getBorderStyle(card.rarity),
        borderRadius: "20px",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        fontFamily: "Lobster",
      }}
    >
      <Card.Img
        src={
          card.imageUrl || "https://via.placeholder.com/300x400?text=No+Image"
        }
        alt={card.name}
        style={{
          height: "250px",
          objectFit: "cover",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      />
      <Card.Body>
        <ul className="ps-3" style={{ listStyleType: "none" }}>
          <li>
            <strong>Titolo:</strong> {card.name}
          </li>
          <li>
            <strong>Descrizione:</strong> {card.description}
          </li>
          <li>
            <strong>Anno:</strong> {card.releaseYear}
          </li>
          <li>
            <strong>Regista:</strong> {card.directorName}
          </li>
          <li>
            <strong>Genere:</strong> {card.genre}
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
}
