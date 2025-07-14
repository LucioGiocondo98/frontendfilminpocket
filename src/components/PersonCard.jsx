import { Card } from "react-bootstrap";

export default function PersonCard({ card }) {
  if (!card) {
    console.error("Errore: card è undefined in PersonCard");
    return null;
  }

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
        fontFamily: "Lobster, cursive",
      }}
    >
      {card.imageUrl && (
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
            opacity: 0.15,
          }}
        />
      )}
      <Card.Body
        style={{
          zIndex: 10,
          position: "relative",
          backgroundColor: "rgba(0, 0, 0, 0.7)", // 👈 aggiunto
        }}
      >
        <ul className="ps-0" style={{ listStyleType: "none" }}>
          <li>
            <strong>Nome:</strong> {card.name}
          </li>
          <li>
            <strong>Descrizione:</strong> {card.description}
          </li>
          <li>
            <strong>Nato il:</strong> {card.bornDate || "N/A"}
          </li>
          <li>
            <strong>Filmografia:</strong>
            <ul>
              {card.filmography && card.filmography.length > 0 ? (
                card.filmography.map((film, idx) => <li key={idx}>{film}</li>)
              ) : (
                <li>Nessun titolo disponibile</li>
              )}
            </ul>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
}
