import { useState } from "react";
import { TextInput, Select, Button } from "@mantine/core";

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
    <form
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

      <Select
        mb="md"
        label="Rarità"
        labelProps={{ className: "text-warning" }}
        value={rarity}
        onChange={setRarity}
        data={[
          { value: "", label: "Tutte" },
          { value: "COMMON", label: "Common" },
          { value: "RARE", label: "Rare" },
          { value: "EPIC", label: "Epic" },
        ]}
      />

      <TextInput
        mb="md"
        label="Genere"
        labelProps={{ className: "text-warning" }}
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Es. Drama"
      />

      <TextInput
        mb="md"
        type="number"
        label="Anno"
        labelProps={{ className: "text-warning" }}
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Es. 1972"
      />

      <Select
        mb="md"
        label="Tipo Carta"
        labelProps={{ className: "text-warning" }}
        value={cardType}
        onChange={setCardType}
        data={[
          { value: "", label: "Tutti" },
          { value: "MOVIE", label: "Movie" },
          { value: "ACTOR", label: "Actor" },
          { value: "DIRECTOR", label: "Director" },
        ]}
      />

      <Button
        type="submit"
        fullWidth
        color="yellow"
        mt="md"
        className="text-uppercase fw-bold"
        style={{ fontFamily: "'Lobster', cursive" }}
      >
        Filtra
      </Button>
    </form>
  );
}
