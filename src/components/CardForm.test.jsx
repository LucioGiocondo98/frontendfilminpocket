import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import CardForm from './CardForm';

const renderWithMantine = (component) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('CardForm', () => {
  const mockFormData = {
    name: '',
    description: '',
    rarity: '',
    releaseYear: '',
    genre: '',
    directorName: '',
    bornDate: '',
    filmography: [],
  };

  describe('Common fields rendering', () => {
    it('renders Tipo di Card label', () => {
      const onChange = vi.fn();
      renderWithMantine(
        <CardForm
          cardType="MOVIE"
          formData={mockFormData}
          onChange={onChange}
          filmographyInput=""
          onFilmographyChange={vi.fn()}
        />
      );
      expect(screen.getByText('Tipo di Card')).toBeInTheDocument();
    });

    it('renders Nome label', () => {
      const onChange = vi.fn();
      renderWithMantine(
        <CardForm
          cardType="MOVIE"
          formData={mockFormData}
          onChange={onChange}
          filmographyInput=""
          onFilmographyChange={vi.fn()}
        />
      );
      expect(screen.getByText('Nome')).toBeInTheDocument();
    });

    it('renders Descrizione label', () => {
      const onChange = vi.fn();
      renderWithMantine(
        <CardForm
          cardType="MOVIE"
          formData={mockFormData}
          onChange={onChange}
          filmographyInput=""
          onFilmographyChange={vi.fn()}
        />
      );
      expect(screen.getByText('Descrizione')).toBeInTheDocument();
    });

    it('renders Rarità label', () => {
      const onChange = vi.fn();
      renderWithMantine(
        <CardForm
          cardType="MOVIE"
          formData={mockFormData}
          onChange={onChange}
          filmographyInput=""
          onFilmographyChange={vi.fn()}
        />
      );
      expect(screen.getByText('Rarità')).toBeInTheDocument();
    });
  });

  describe('MOVIE type fields', () => {
    it('renders MOVIE-specific fields', () => {
      const onChange = vi.fn();
      renderWithMantine(
        <CardForm
          cardType="MOVIE"
          formData={mockFormData}
          onChange={onChange}
          filmographyInput=""
          onFilmographyChange={vi.fn()}
        />
      );
      expect(screen.getByText('Anno uscita')).toBeInTheDocument();
      expect(screen.getByText('Genere')).toBeInTheDocument();
      expect(screen.getByText('Regista')).toBeInTheDocument();
    });

    it('does not render ACTOR fields for MOVIE type', () => {
      const onChange = vi.fn();
      renderWithMantine(
        <CardForm
          cardType="MOVIE"
          formData={mockFormData}
          onChange={onChange}
          filmographyInput=""
          onFilmographyChange={vi.fn()}
        />
      );
      expect(screen.queryByText('Data di nascita')).not.toBeInTheDocument();
    });
  });

  describe('ACTOR type fields', () => {
    it('renders ACTOR-specific fields', () => {
      const onChange = vi.fn();
      renderWithMantine(
        <CardForm
          cardType="ACTOR"
          formData={mockFormData}
          onChange={onChange}
          filmographyInput=""
          onFilmographyChange={vi.fn()}
        />
      );
      expect(screen.getByText('Data di nascita')).toBeInTheDocument();
      expect(screen.getByText('Filmografia')).toBeInTheDocument();
    });

    it('does not render MOVIE fields for ACTOR type', () => {
      const onChange = vi.fn();
      renderWithMantine(
        <CardForm
          cardType="ACTOR"
          formData={mockFormData}
          onChange={onChange}
          filmographyInput=""
          onFilmographyChange={vi.fn()}
        />
      );
      expect(screen.queryByText('Anno uscita')).not.toBeInTheDocument();
    });
  });

  describe('DIRECTOR type fields', () => {
    it('renders DIRECTOR-specific fields', () => {
      const onChange = vi.fn();
      renderWithMantine(
        <CardForm
          cardType="DIRECTOR"
          formData={mockFormData}
          onChange={onChange}
          filmographyInput=""
          onFilmographyChange={vi.fn()}
        />
      );
      expect(screen.getByText('Data di nascita')).toBeInTheDocument();
      expect(screen.getByText('Filmografia')).toBeInTheDocument();
    });

    it('does not render MOVIE fields for DIRECTOR type', () => {
      const onChange = vi.fn();
      renderWithMantine(
        <CardForm
          cardType="DIRECTOR"
          formData={mockFormData}
          onChange={onChange}
          filmographyInput=""
          onFilmographyChange={vi.fn()}
        />
      );
      expect(screen.queryByText('Anno uscita')).not.toBeInTheDocument();
    });
  });

  describe('Conditional rendering', () => {
    it('renders no conditional fields when cardType is empty', () => {
      const onChange = vi.fn();
      renderWithMantine(
        <CardForm
          cardType=""
          formData={mockFormData}
          onChange={onChange}
          filmographyInput=""
          onFilmographyChange={vi.fn()}
        />
      );
      expect(screen.queryByText('Anno uscita')).not.toBeInTheDocument();
      expect(screen.queryByText('Data di nascita')).not.toBeInTheDocument();
    });

    it('handles lowercase cardType correctly', () => {
      const onChange = vi.fn();
      renderWithMantine(
        <CardForm
          cardType="movie"
          formData={mockFormData}
          onChange={onChange}
          filmographyInput=""
          onFilmographyChange={vi.fn()}
        />
      );
      // Normalized to MOVIE
      expect(screen.getByText('Anno uscita')).toBeInTheDocument();
    });
  });
});
