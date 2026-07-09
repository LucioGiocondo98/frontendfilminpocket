import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import DeckPage from './DeckPage';

// Mock child components
vi.mock('../components/TopNavbar', () => ({
  default: () => <div data-testid="top-navbar">TopNavbar</div>,
}));

vi.mock('../components/BottomNavbar', () => ({
  default: () => <div data-testid="bottom-navbar">BottomNavbar</div>,
}));

vi.mock('../components/DeckBuilder', () => ({
  default: () => <div data-testid="deck-builder">DeckBuilder</div>,
}));

const renderWithMantine = (component) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('DeckPage', () => {
  it('renders without crashing', () => {
    renderWithMantine(<DeckPage />);
    expect(screen.getByTestId('top-navbar')).toBeInTheDocument();
  });

  it('renders TopNavbar component', () => {
    renderWithMantine(<DeckPage />);
    expect(screen.getByTestId('top-navbar')).toBeInTheDocument();
  });

  it('renders DeckBuilder component', () => {
    renderWithMantine(<DeckPage />);
    expect(screen.getByTestId('deck-builder')).toBeInTheDocument();
  });

  it('renders BottomNavbar component', () => {
    renderWithMantine(<DeckPage />);
    expect(screen.getByTestId('bottom-navbar')).toBeInTheDocument();
  });

  it('renders Container with correct structure', () => {
    const { container } = renderWithMantine(<DeckPage />);
    const mainDiv = container.querySelector('.d-flex.flex-column.min-vh-100.text-light');
    expect(mainDiv).toBeInTheDocument();
  });

  it('applies correct padding and layout styles to Container', () => {
    const { container } = renderWithMantine(<DeckPage />);
    expect(container.querySelector('.flex-grow-1')).toBeInTheDocument();
  });
});
