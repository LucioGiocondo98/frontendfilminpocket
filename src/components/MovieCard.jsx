import { Card, Image, Text } from "@mantine/core";
import pellicola from "../assets/pellicola.jpg";
import "../styles/Card.css";
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
        <Card.Section>
          <Image src={card.imageUrl} alt={card.name} h={200} fit="cover" />
        </Card.Section>
      )}

      <div
        className="m-auto align-items-center px-3"
        style={{
          color: "black",
          borderRadius: "12px",
        }}
      >
        <Text fw={600} ta="center">
          {card.name}
        </Text>
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
            <strong>Anno di uscita:</strong> <span>{card.releaseYear}</span>
          </li>
          <li>
            <strong>Regista:</strong> <span>{card.directorName}</span>
          </li>
          <li>
            <strong>Genere:</strong> <span>{card.genre}</span>
          </li>
        </ul>
      </div>
      <div className={`card-rarity-badge ${card.rarity.toLowerCase()}`}>
        {card.rarity}
      </div>
    </Card>
  );
}
