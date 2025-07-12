import { Card } from "react-bootstrap";

export default function PersonCard({ card }) {
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Card.Img
        src={card.imageUrl}
        alt={card.name}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Card.Body
        style={{
          zIndex: 10,
          position: "relative",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "20px",
        }}
      >
        <Card.Title>{card.name}</Card.Title>
        <ul className="ps-3" style={{ listStyleType: "none" }}>
          <li>
            <strong>Nato il:</strong> {card.bornDate}
          </li>
          <li>
            <strong>Filmografia:</strong>
            <ul>
              {card.filmography?.map((film, index) => (
                <li key={index}>{film}</li>
              ))}
            </ul>
          </li>
          {card.type === "DIRECTOR" && card.notableWorks && (
            <li>
              <strong>Opere famose:</strong>
              <ul>
                {card.notableWorks.map((title, idx) => (
                  <li key={idx}>{title}</li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </Card.Body>
    </Card>
  );
}
