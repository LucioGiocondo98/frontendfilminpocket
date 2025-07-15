import { Card } from "react-bootstrap";
import pellicola from "../assets/pellicola.jpg";

export default function MovieCard({ card }) {
  const getBorderStyle = (rarity) => {
    switch (rarity) {
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
      className=" text-black"
      style={{
        border: getBorderStyle(card.rarity),
        //backgroundImage: `url(${pellicola})`,
        //backgroundSize: "cover",
        //backgroundPosition: "center",
        borderRadius: "20px",
        height: "100%",
        fontFamily: "'Lobster', cursive",
      }}
    >
      <div
        className="p-2"
        style={{
          backgroundImage: `url(${pellicola})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "20px",
          height: "100%",
        }}
      >
        {/* Card Image */}
        {card.imageUrl && (
          <Card.Img
            variant="top"
            src={card.imageUrl}
            alt={card.name}
            className="card-img-top"
            style={{
              height: "200px",
              objectFit: "cover",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          />
        )}

        {/* Card Body */}
        <Card.Body className="m-auto">
          <ul className=" flex-grow-1 text-black m-auto">
            <li>
              <strong>Nome:</strong> {card.name}
            </li>
            <li>
              <strong>Descrizione:</strong> {card.description}
            </li>
            <li>
              <strong>Anno di uscita:</strong> {card.releaseYear}
            </li>
            <li>
              <strong>Regista:</strong> {card.directorName}
            </li>
            <li>
              <strong>Genere:</strong> {card.genre}
            </li>
          </ul>
        </Card.Body>
      </div>
    </Card>
  );
}
