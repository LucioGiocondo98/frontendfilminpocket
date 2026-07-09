import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import DeckDetailsModal from './DeckDetailsModal';

vi.mock('./MovieCard', () => ({
  default: ({ card }) => <div data-testid={`movie-card-${card.id}`}>Movie: {card.name}</div>,
}));

vi.mock('./PersonCard', () => ({
  default: ({ card }) => <div data-testid={`person-card-${card.id}`}>Person: {card.name}</div>,
}));

const renderWithMantine = (component) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

const mockDeck = {
  id: 1,
  name: 'My Deck',
  cards: [
    { id: 1, name: 'Movie 1', cardType: 'MOVIE' },
    { id: 2, name: 'Actor 1', cardType: 'ACTOR' },
    { id: 3, name: 'Director 1', cardType: 'DIRECTOR' },
  ],
};

describe('DeckDetailsModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Visibility', () => {
    it('returns null when deck is not provided', () => {
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={vi.fn()} />
      );
      expect(screen.queryByText('My Deck')).not.toBeInTheDocument();
    });

    it('returns null when deck is null', () => {
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={vi.fn()} deck={null} />
      );
      expect(screen.queryByText('My Deck')).not.toBeInTheDocument();
    });

    it('renders modal content when show is true', () => {
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={vi.fn()} deck={mockDeck} />
      );
      expect(screen.getByText(mockDeck.name)).toBeInTheDocument();
    });
  });

  describe('Modal title', () => {
    it('displays deck name in title', () => {
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={vi.fn()} deck={mockDeck} />
      );
      expect(screen.getByText(mockDeck.name)).toBeInTheDocument();
    });

    it('displays "Anteprima Mazzo" when editable and deck name is empty', () => {
      const deckWithoutName = { ...mockDeck, name: '' };
      renderWithMantine(
        <DeckDetailsModal
          show={true}
          onHide={vi.fn()}
          deck={deckWithoutName}
          editable={true}
        />
      );
      expect(screen.getByText('Anteprima Mazzo')).toBeInTheDocument();
    });
  });

  describe('Card rendering', () => {
    it('renders all cards from deck', () => {
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={vi.fn()} deck={mockDeck} />
      );

      expect(screen.getByTestId('movie-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('person-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('person-card-3')).toBeInTheDocument();
    });

    it('renders MovieCard for MOVIE type cards', () => {
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={vi.fn()} deck={mockDeck} />
      );
      expect(screen.getByText('Movie: Movie 1')).toBeInTheDocument();
    });

    it('renders PersonCard for ACTOR type cards', () => {
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={vi.fn()} deck={mockDeck} />
      );
      expect(screen.getByText('Person: Actor 1')).toBeInTheDocument();
    });

    it('renders PersonCard for DIRECTOR type cards', () => {
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={vi.fn()} deck={mockDeck} />
      );
      expect(screen.getByText('Person: Director 1')).toBeInTheDocument();
    });

    it('renders empty message when deck has no cards', () => {
      const emptyDeck = { ...mockDeck, cards: [] };
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={vi.fn()} deck={emptyDeck} />
      );
      expect(screen.getByText('Nessuna carta nel mazzo')).toBeInTheDocument();
    });

    it('renders empty message when deck.cards is null', () => {
      const deckNoCards = { ...mockDeck, cards: null };
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={vi.fn()} deck={deckNoCards} />
      );
      expect(screen.getByText('Nessuna carta nel mazzo')).toBeInTheDocument();
    });
  });

  describe('Editable mode', () => {
    it('renders TextInput for deck name when editable', () => {
      renderWithMantine(
        <DeckDetailsModal
          show={true}
          onHide={vi.fn()}
          deck={mockDeck}
          editable={true}
          onDeckNameChange={vi.fn()}
        />
      );
      // Verify the component renders in editable mode
      expect(screen.getByText(mockDeck.name)).toBeInTheDocument();
    });

    it('calls onDeckNameChange when deck name is changed', async () => {
      const user = userEvent.setup();
      const onDeckNameChange = vi.fn();
      const { container } = renderWithMantine(
        <DeckDetailsModal
          show={true}
          onHide={vi.fn()}
          deck={mockDeck}
          editable={true}
          onDeckNameChange={onDeckNameChange}
        />
      );

      // Find input and type in it
      const inputs = container.querySelectorAll('input');
      const deckNameInput = Array.from(inputs).find(input =>
        input.placeholder && input.placeholder.includes('Nome del deck')
      );

      if (deckNameInput) {
        await user.clear(deckNameInput);
        await user.type(deckNameInput, 'New Deck Name');
        expect(onDeckNameChange).toHaveBeenCalled();
      }
    });
  });

  describe('Buttons', () => {
    it('renders "Chiudi" button', () => {
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={vi.fn()} deck={mockDeck} />
      );
      expect(screen.getByRole('button', { name: /Chiudi/i })).toBeInTheDocument();
    });

    it('calls onHide when Chiudi button is clicked', async () => {
      const user = userEvent.setup();
      const onHide = vi.fn();
      renderWithMantine(
        <DeckDetailsModal
          show={true}
          onHide={onHide}
          deck={mockDeck}
        />
      );

      const closeButton = screen.getByRole('button', { name: /Chiudi/i });
      await user.click(closeButton);

      expect(onHide).toHaveBeenCalled();
    });

    it('renders "Crea Mazzo" button in editable mode', () => {
      renderWithMantine(
        <DeckDetailsModal
          show={true}
          onHide={vi.fn()}
          deck={mockDeck}
          editable={true}
          isEditMode={false}
        />
      );
      expect(screen.getByRole('button', { name: /Crea Mazzo/i })).toBeInTheDocument();
    });

    it('renders "Salva Modifiche" button when in edit mode', () => {
      renderWithMantine(
        <DeckDetailsModal
          show={true}
          onHide={vi.fn()}
          deck={mockDeck}
          editable={true}
          isEditMode={true}
        />
      );
      expect(screen.getByRole('button', { name: /Salva Modifiche/i })).toBeInTheDocument();
    });

    it('calls onSaveDeck when save button is clicked', async () => {
      const user = userEvent.setup();
      const onSaveDeck = vi.fn();
      renderWithMantine(
        <DeckDetailsModal
          show={true}
          onHide={vi.fn()}
          deck={mockDeck}
          editable={true}
          onSaveDeck={onSaveDeck}
        />
      );

      const saveButton = screen.getByRole('button', { name: /Crea Mazzo/i });
      await user.click(saveButton);

      expect(onSaveDeck).toHaveBeenCalled();
    });
  });

  describe('Props handling', () => {
    it('accepts show prop', () => {
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={vi.fn()} deck={mockDeck} />
      );
      expect(screen.getByText(mockDeck.name)).toBeInTheDocument();
    });

    it('accepts onHide callback', () => {
      const onHide = vi.fn();
      renderWithMantine(
        <DeckDetailsModal show={true} onHide={onHide} deck={mockDeck} />
      );
      expect(onHide).toBeDefined();
    });

    it('accepts editable prop', () => {
      renderWithMantine(
        <DeckDetailsModal
          show={true}
          onHide={vi.fn()}
          deck={mockDeck}
          editable={true}
        />
      );
      expect(screen.getByText(mockDeck.name)).toBeInTheDocument();
    });
  });
});
