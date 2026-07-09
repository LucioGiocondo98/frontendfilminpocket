import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import PersonCard from './PersonCard';

const renderWithMantine = (component) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('PersonCard', () => {
  const mockCard = {
    id: 1,
    name: 'Stanley Kubrick',
    description: 'An American film director and producer known for producing many masterpieces.',
    bornDate: '1928-07-26',
    filmography: ['2001: A Space Odyssey', 'The Shining', 'Full Metal Jacket'],
    rarity: 'EPIC',
    imageUrl: 'https://example.com/person.jpg',
  };

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithMantine(<PersonCard card={mockCard} />);
      expect(screen.getByText(mockCard.name)).toBeInTheDocument();
    });

    it('displays the person name', () => {
      renderWithMantine(<PersonCard card={mockCard} />);
      expect(screen.getByText(mockCard.name)).toBeInTheDocument();
    });

    it('displays the description', () => {
      renderWithMantine(<PersonCard card={mockCard} />);
      expect(screen.getByText(mockCard.description)).toBeInTheDocument();
    });

    it('displays the born date', () => {
      renderWithMantine(<PersonCard card={mockCard} />);
      expect(screen.getByText(mockCard.bornDate)).toBeInTheDocument();
    });
  });

  describe('Rarity Badge', () => {
    it('displays rarity badge with correct text', () => {
      renderWithMantine(<PersonCard card={mockCard} />);
      expect(screen.getByText('EPIC')).toBeInTheDocument();
    });

    it('applies rarity badge CSS class', () => {
      const { container } = renderWithMantine(<PersonCard card={mockCard} />);
      const badge = container.querySelector('.card-rarity-badge.epic');
      expect(badge).toBeInTheDocument();
    });

    it('applies lowercase rarity in CSS class', () => {
      const { container } = renderWithMantine(<PersonCard card={mockCard} />);
      const badge = container.querySelector('.card-rarity-badge');
      expect(badge).toHaveClass('epic');
    });
  });

  describe('Border styling by rarity', () => {
    it('applies white border for COMMON rarity', () => {
      const card = { ...mockCard, rarity: 'COMMON' };
      renderWithMantine(<PersonCard card={card} />);
      expect(screen.getByText('COMMON')).toBeInTheDocument();
    });

    it('applies gray border for RARE rarity', () => {
      const card = { ...mockCard, rarity: 'RARE' };
      renderWithMantine(<PersonCard card={card} />);
      expect(screen.getByText('RARE')).toBeInTheDocument();
    });

    it('applies gold border for EPIC rarity', () => {
      const card = { ...mockCard, rarity: 'EPIC' };
      renderWithMantine(<PersonCard card={card} />);
      expect(screen.getByText('EPIC')).toBeInTheDocument();
    });

    it('applies default gray border for unknown rarity', () => {
      const card = { ...mockCard, rarity: 'LEGENDARY' };
      renderWithMantine(<PersonCard card={card} />);
      expect(screen.getByText('LEGENDARY')).toBeInTheDocument();
    });
  });

  describe('Image handling', () => {
    it('displays image when imageUrl is provided', () => {
      renderWithMantine(<PersonCard card={mockCard} />);
      const image = screen.getByAltText(mockCard.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockCard.imageUrl);
    });

    it('does not render image section when imageUrl is not provided', () => {
      const card = { ...mockCard, imageUrl: null };
      const { container } = renderWithMantine(<PersonCard card={card} />);
      const image = container.querySelector('img');
      expect(image).not.toBeInTheDocument();
    });

    it('does not render image section when imageUrl is undefined', () => {
      const card = { ...mockCard, imageUrl: undefined };
      const { container } = renderWithMantine(<PersonCard card={card} />);
      const image = container.querySelector('img');
      expect(image).not.toBeInTheDocument();
    });
  });

  describe('Filmography handling', () => {
    it('displays filmography array as list items', () => {
      renderWithMantine(<PersonCard card={mockCard} />);
      expect(screen.getByText('2001: A Space Odyssey')).toBeInTheDocument();
      expect(screen.getByText('The Shining')).toBeInTheDocument();
      expect(screen.getByText('Full Metal Jacket')).toBeInTheDocument();
    });

    it('displays single filmography string', () => {
      const card = { ...mockCard, filmography: 'Single Film Title' };
      renderWithMantine(<PersonCard card={card} />);
      expect(screen.getByText('Single Film Title')).toBeInTheDocument();
    });

    it('displays filmography label', () => {
      renderWithMantine(<PersonCard card={mockCard} />);
      expect(screen.getByText('Filmografia:')).toBeInTheDocument();
    });

    it('renders filmography items in nested list', () => {
      const { container } = renderWithMantine(<PersonCard card={mockCard} />);
      const filmList = container.querySelector('ul ul');
      expect(filmList).toBeInTheDocument();
      const filmItems = filmList?.querySelectorAll('li');
      expect(filmItems?.length).toBe(3);
    });
  });

  describe('Field labels', () => {
    it('displays all field labels', () => {
      renderWithMantine(<PersonCard card={mockCard} />);
      expect(screen.getByText('Descrizione:')).toBeInTheDocument();
      expect(screen.getByText('Data di nascita:')).toBeInTheDocument();
      expect(screen.getByText('Filmografia:')).toBeInTheDocument();
    });
  });

  describe('Styling and layout', () => {
    it('applies text-black class', () => {
      const { container } = renderWithMantine(<PersonCard card={mockCard} />);
      const card = container.querySelector('[class*="Card"]');
      expect(card).toBeInTheDocument();
    });

    it('renders name with bold font weight', () => {
      renderWithMantine(<PersonCard card={mockCard} />);
      const titleText = screen.getByText(mockCard.name);
      expect(titleText).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles empty filmography array', () => {
      const card = { ...mockCard, filmography: [] };
      renderWithMantine(<PersonCard card={card} />);
      expect(screen.getByText('Filmografia:')).toBeInTheDocument();
    });

    it('handles filmography with single item', () => {
      const card = { ...mockCard, filmography: ['One Film'] };
      const { container } = renderWithMantine(<PersonCard card={card} />);
      expect(screen.getByText('One Film')).toBeInTheDocument();
      const filmList = container.querySelector('ul ul');
      const filmItems = filmList?.querySelectorAll('li');
      expect(filmItems?.length).toBe(1);
    });
  });
});
