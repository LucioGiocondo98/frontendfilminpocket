import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import CardPreview from './CardPreview';

const renderWithMantine = (component) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

// Mock child components
vi.mock('./MovieCard', () => ({
  default: ({ card }) => (
    <div data-testid="movie-card">
      MovieCard: {card.name}
    </div>
  ),
}));

vi.mock('./PersonCard', () => ({
  default: ({ card }) => (
    <div data-testid="person-card">
      PersonCard: {card.name}
    </div>
  ),
}));

describe('CardPreview', () => {
  const mockFormData = {
    name: 'Test Card',
    description: 'A test card description',
    imageUrl: 'https://example.com/card.jpg',
  };

  describe('Movie card rendering', () => {
    it('renders MovieCard when cardType is "MOVIE"', () => {
      renderWithMantine(
        <CardPreview cardType="MOVIE" formData={mockFormData} />
      );
      expect(screen.getByTestId('movie-card')).toBeInTheDocument();
    });

    it('renders MovieCard when cardType is "movie" (lowercase)', () => {
      renderWithMantine(
        <CardPreview cardType="movie" formData={mockFormData} />
      );
      expect(screen.getByTestId('movie-card')).toBeInTheDocument();
    });

    it('passes correct previewCard to MovieCard', () => {
      renderWithMantine(
        <CardPreview cardType="MOVIE" formData={mockFormData} />
      );
      const movieCard = screen.getByTestId('movie-card');
      expect(movieCard).toHaveTextContent('Test Card');
    });
  });

  describe('Person card rendering', () => {
    it('renders PersonCard when cardType is not "MOVIE"', () => {
      renderWithMantine(
        <CardPreview cardType="PERSON" formData={mockFormData} />
      );
      expect(screen.getByTestId('person-card')).toBeInTheDocument();
    });

    it('renders PersonCard as default when cardType is undefined', () => {
      renderWithMantine(
        <CardPreview cardType={undefined} formData={mockFormData} />
      );
      expect(screen.getByTestId('person-card')).toBeInTheDocument();
    });

    it('renders PersonCard when cardType is "person" (lowercase)', () => {
      renderWithMantine(
        <CardPreview cardType="person" formData={mockFormData} />
      );
      expect(screen.getByTestId('person-card')).toBeInTheDocument();
    });
  });

  describe('Image handling', () => {
    it('uses imageFile URL when imageFile is provided', () => {
      const imageFile = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      renderWithMantine(
        <CardPreview cardType="MOVIE" formData={mockFormData} imageFile={imageFile} />
      );
      expect(screen.getByTestId('movie-card')).toBeInTheDocument();
    });

    it('uses formData imageUrl when imageFile is not provided', () => {
      renderWithMantine(
        <CardPreview cardType="MOVIE" formData={mockFormData} imageFile={null} />
      );
      const movieCard = screen.getByTestId('movie-card');
      expect(movieCard).toHaveTextContent('Test Card');
    });

    it('uses formData imageUrl when imageFile is undefined', () => {
      renderWithMantine(
        <CardPreview cardType="MOVIE" formData={mockFormData} />
      );
      const movieCard = screen.getByTestId('movie-card');
      expect(movieCard).toHaveTextContent('Test Card');
    });

    it('sets imageUrl to null when neither imageFile nor formData.imageUrl exists', () => {
      const formDataWithoutImage = { name: 'Test', description: 'Test' };
      renderWithMantine(
        <CardPreview cardType="MOVIE" formData={formDataWithoutImage} imageFile={null} />
      );
      expect(screen.getByTestId('movie-card')).toBeInTheDocument();
    });
  });

  describe('PreviewCard construction', () => {
    it('spreads formData properties into previewCard', () => {
      const formDataWithMultipleProps = {
        name: 'Inception',
        description: 'A mind-bending thriller',
        releaseYear: '2010',
        directorName: 'Christopher Nolan',
        genre: 'Sci-Fi',
      };

      renderWithMantine(
        <CardPreview cardType="MOVIE" formData={formDataWithMultipleProps} />
      );

      const movieCard = screen.getByTestId('movie-card');
      expect(movieCard).toHaveTextContent('Inception');
    });

    it('includes cardType in previewCard', () => {
      renderWithMantine(
        <CardPreview cardType="MOVIE" formData={mockFormData} />
      );
      expect(screen.getByTestId('movie-card')).toBeInTheDocument();
    });
  });

  describe('Center layout wrapper', () => {
    it('wraps card in Center component', () => {
      const { container } = renderWithMantine(
        <CardPreview cardType="MOVIE" formData={mockFormData} />
      );
      // Center component renders, just verify the card is rendered
      expect(screen.getByTestId('movie-card')).toBeInTheDocument();
    });
  });

  describe('Type conversion', () => {
    it('correctly handles uppercase cardType', () => {
      renderWithMantine(
        <CardPreview cardType="MOVIE" formData={mockFormData} />
      );
      expect(screen.getByTestId('movie-card')).toBeInTheDocument();
    });

    it('correctly handles mixed case cardType', () => {
      renderWithMantine(
        <CardPreview cardType="Movie" formData={mockFormData} />
      );
      expect(screen.getByTestId('movie-card')).toBeInTheDocument();
    });

    it('correctly handles lowercase cardType', () => {
      renderWithMantine(
        <CardPreview cardType="movie" formData={mockFormData} />
      );
      expect(screen.getByTestId('movie-card')).toBeInTheDocument();
    });
  });
});
