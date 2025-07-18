import { Form } from "react-bootstrap";

function CardForm({
  cardType,
  formData,
  onChange,
  filmographyInput,
  onFilmographyChange,
}) {
  const renderTypeSpecificFields = () => {
    switch (cardType) {
      case "MOVIE":
        return (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Anno uscita</Form.Label>
              <Form.Control
                name="releaseYear"
                value={formData.releaseYear}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Genere</Form.Label>
              <Form.Control
                name="genre"
                value={formData.genre}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Regista</Form.Label>
              <Form.Control
                name="directorName"
                value={formData.directorName}
                onChange={onChange}
              />
            </Form.Group>
          </>
        );
      case "ACTOR":
      case "DIRECTOR":
        return (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Data di nascita</Form.Label>
              <Form.Control
                name="bornDate"
                value={formData.bornDate}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Filmografia</Form.Label>
              <Form.Control
                name="filmography"
                value={filmographyInput}
                onChange={onFilmographyChange}
              />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Form.Group className="mb-2">
        <Form.Label>Tipo di Card</Form.Label>
        <Form.Select name="cardType" value={cardType} onChange={onChange}>
          <option value="MOVIE">Movie</option>
          <option value="ACTOR">Actor</option>
          <option value="DIRECTOR">Director</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Nome</Form.Label>
        <Form.Control name="name" value={formData.name} onChange={onChange} />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Descrizione</Form.Label>
        <Form.Control
          name="description"
          value={formData.description}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Rarità</Form.Label>
        <Form.Select name="rarity" value={formData.rarity} onChange={onChange}>
          <option value="COMMON">COMMON</option>
          <option value="RARE">RARE</option>
          <option value="EPIC">EPIC</option>
        </Form.Select>
      </Form.Group>

      {renderTypeSpecificFields()}
    </>
  );
}

export default CardForm;
