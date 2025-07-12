import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function SidebarFiltri({ onFilterChange }) {
  const [rarity, setRarity] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [cardType, setCardType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ rarity, genre, year, cardType });
  };

  return (
    <Form onSubmit={handleSubmit} className="text-light">
      <Form.Group className="mb-3">
        <Form.Label>Rarità</Form.Label>
        <Form.Select value={rarity} onChange={(e) => setRarity(e.target.value)}>
          <option value="">Tutte</option>
          <option value="COMMON">Common</option>
          <option value="RARE">Rare</option>
          <option value="EPIC">Epic</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Genere</Form.Label>
        <Form.Control
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Es. Drama"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Anno</Form.Label>
        <Form.Control
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tipo Carta</Form.Label>
        <Form.Select
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
        >
          <option value="">Tutti</option>
          <option value="MOVIE">Movie</option>
          <option value="ACTOR">Actor</option>
          <option value="DIRECTOR">Director</option>
        </Form.Select>
      </Form.Group>

      <Button variant="warning" type="submit" className="w-100">
        Filtra
      </Button>
    </Form>
  );
}
