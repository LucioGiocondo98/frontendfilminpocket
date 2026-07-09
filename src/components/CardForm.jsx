import { TextInput, Select } from "@mantine/core";

function CardForm({
  cardType,
  formData,
  onChange,
  filmographyInput,
  onFilmographyChange,
}) {
  const renderTypeSpecificFields = () => {
    const normalizedType = cardType?.toUpperCase();

    switch (normalizedType) {
      case "MOVIE":
        return (
          <>
            <TextInput
              mb="sm"
              label="Anno uscita"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={onChange}
            />
            <TextInput
              mb="sm"
              label="Genere"
              name="genre"
              value={formData.genre}
              onChange={onChange}
            />
            <TextInput
              mb="sm"
              label="Regista"
              name="directorName"
              value={formData.directorName}
              onChange={onChange}
            />
          </>
        );
      case "ACTOR":
      case "DIRECTOR":
        return (
          <>
            <TextInput
              mb="sm"
              label="Data di nascita"
              name="bornDate"
              value={formData.bornDate}
              onChange={onChange}
            />
            <TextInput
              mb="sm"
              label="Filmografia"
              name="filmography"
              value={filmographyInput}
              onChange={onFilmographyChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Select
        mb="sm"
        label="Tipo di Card"
        name="cardType"
        value={cardType}
        onChange={(value) => onChange({ target: { name: "cardType", value } })}
        data={[
          { value: "MOVIE", label: "Movie" },
          { value: "ACTOR", label: "Actor" },
          { value: "DIRECTOR", label: "Director" },
        ]}
      />

      <TextInput
        mb="sm"
        label="Nome"
        name="name"
        value={formData.name}
        onChange={onChange}
      />

      <TextInput
        mb="sm"
        label="Descrizione"
        name="description"
        value={formData.description}
        onChange={onChange}
      />

      <Select
        mb="sm"
        label="Rarità"
        name="rarity"
        value={formData.rarity}
        onChange={(value) => onChange({ target: { name: "rarity", value } })}
        data={[
          { value: "COMMON", label: "COMMON" },
          { value: "RARE", label: "RARE" },
          { value: "EPIC", label: "EPIC" },
        ]}
      />

      {renderTypeSpecificFields()}
    </>
  );
}

export default CardForm;
