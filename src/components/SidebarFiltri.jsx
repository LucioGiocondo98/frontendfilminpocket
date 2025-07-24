import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SidebarFiltri = function ({ onFilterChange }) {
  const [rarity, setRarity] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [cardType, setCardType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ rarity, genre, year, cardType });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-3 rounded text-light"
      style={{
        backgroundColor: "#1f1f1f",
        border: "1px solid #2a2a2a",
        fontFamily: "'Lobster', cursive",
      }}
    >
      <h5 className="text-warning mb-4 text-center">
        <i className="bi bi-film"></i> Filtra le tue carte
      </h5>

      <Form.Group className="mb-3">
        <Form.Label className="text-warning">Rarità</Form.Label>
        <Form.Select value={rarity} onChange={(e) => setRarity(e.target.value)}>
          <option value="">Tutte</option>
          <option value="COMMON">Common</option>
          <option value="RARE">Rare</option>
          <option value="EPIC">Epic</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-warning">Genere</Form.Label>
        <Form.Control
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Es. Drama"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-warning">Anno</Form.Label>
        <Form.Control
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Es. 1972"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-warning">Tipo Carta</Form.Label>
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

      <Button
        variant="warning"
        type="submit"
        className="w-100 mt-3 text-uppercase fw-bold"
        style={{ fontFamily: "'Lobster', cursive" }}
      >
        Filtra
      </Button>
    </Form>
  );
};
export default SidebarFiltri;
