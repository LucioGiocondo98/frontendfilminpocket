import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomNavbar from './BottomNavbar';

const renderBottomNavbar = (component) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe('BottomNavbar', () => {
  describe('Navigation links rendering', () => {
    it('renders without crashing', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      expect(container).toBeInTheDocument();
    });

    it('renders Home link', () => {
      renderBottomNavbar(<BottomNavbar />);
      const homeLinks = screen.getAllByRole('link', { name: /Home/i });
      expect(homeLinks.length).toBeGreaterThan(0);
      expect(homeLinks[0]).toHaveAttribute('href', '/home');
    });

    it('renders Collezione link', () => {
      renderBottomNavbar(<BottomNavbar />);
      const collezioneLink = screen.getByRole('link', { name: /Collezione/i });
      expect(collezioneLink).toBeInTheDocument();
      expect(collezioneLink).toHaveAttribute('href', '/collection');
    });

    it('renders Deck link', () => {
      renderBottomNavbar(<BottomNavbar />);
      const deckLink = screen.getByRole('link', { name: /^Deck$/i });
      expect(deckLink).toBeInTheDocument();
      expect(deckLink).toHaveAttribute('href', '/decks');
    });

    it('renders Community link', () => {
      renderBottomNavbar(<BottomNavbar />);
      const communityLink = screen.getByRole('link', { name: /Community/i });
      expect(communityLink).toBeInTheDocument();
      expect(communityLink).toHaveAttribute('href', '/home');
    });
  });

  describe('Link destinations', () => {
    it('Home link points to /home', () => {
      renderBottomNavbar(<BottomNavbar />);
      const homeLinks = screen.getAllByRole('link', { name: /Home/i });
      expect(homeLinks[0]).toHaveAttribute('href', '/home');
    });

    it('Collezione link points to /collection', () => {
      renderBottomNavbar(<BottomNavbar />);
      const collezioneLink = screen.getByRole('link', { name: /Collezione/i });
      expect(collezioneLink).toHaveAttribute('href', '/collection');
    });

    it('Deck link points to /decks', () => {
      renderBottomNavbar(<BottomNavbar />);
      const deckLink = screen.getByRole('link', { name: /^Deck$/i });
      expect(deckLink).toHaveAttribute('href', '/decks');
    });

    it('Community link points to /home', () => {
      renderBottomNavbar(<BottomNavbar />);
      const communityLink = screen.getByRole('link', { name: /Community/i });
      expect(communityLink).toHaveAttribute('href', '/home');
    });
  });

  describe('Structure and styling', () => {
    it('renders container with correct class', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      const navContainer = container.querySelector('.bottom-navbar-container');
      expect(navContainer).toBeInTheDocument();
    });

    it('applies Bootstrap dark theme classes', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      const navContainer = container.querySelector('.bottom-navbar-container');
      expect(navContainer).toHaveClass('bg-dark');
      expect(navContainer).toHaveClass('border-secondary');
      expect(navContainer).toHaveClass('shadow-sm');
    });

    it('renders row with correct classes for layout', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      const row = container.querySelector('.row');
      expect(row).toBeInTheDocument();
      expect(row).toHaveClass('justify-content-evenly');
      expect(row).toHaveClass('text-center');
      expect(row).toHaveClass('gx-0');
    });

    it('renders 4 columns for navigation items', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      const columns = container.querySelectorAll('.col-3');
      expect(columns).toHaveLength(4);
    });

    it('applies bottom-icon class to each column', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      const icons = container.querySelectorAll('.bottom-icon');
      expect(icons).toHaveLength(4);
    });

    it('each link has nav-link-custom class', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      const customLinks = container.querySelectorAll('.nav-link-custom');
      expect(customLinks.length).toBeGreaterThanOrEqual(4);
    });

    it('each navigation item has nav-text span for label', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      const navTexts = container.querySelectorAll('.nav-text');
      expect(navTexts).toHaveLength(4);
    });
  });

  describe('Icon rendering', () => {
    it('renders icon for each navigation link', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      const links = container.querySelectorAll('.nav-link-custom');

      links.forEach((link) => {
        const icon = link.querySelector('svg');
        expect(icon).toBeInTheDocument();
      });
    });

    it('renders Home icon', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      const homeLink = screen.getAllByRole('link', { name: /Home/i })[0];
      const icon = homeLink.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders Collezione icon', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      const collezioneLink = screen.getByRole('link', { name: /Collezione/i });
      const icon = collezioneLink.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders Deck icon', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      const deckLink = screen.getByRole('link', { name: /^Deck$/i });
      const icon = deckLink.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders Community icon', () => {
      const { container } = renderBottomNavbar(<BottomNavbar />);
      const communityLink = screen.getByRole('link', { name: /Community/i });
      const icon = communityLink.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Link text labels', () => {
    it('displays "Home" text for first link', () => {
      renderBottomNavbar(<BottomNavbar />);
      const navTexts = screen.getAllByText('Home');
      expect(navTexts.length).toBeGreaterThan(0);
    });

    it('displays "Collezione" text', () => {
      renderBottomNavbar(<BottomNavbar />);
      const collezioneText = screen.getByText('Collezione');
      expect(collezioneText).toBeInTheDocument();
    });

    it('displays "Deck" text', () => {
      renderBottomNavbar(<BottomNavbar />);
      const deckText = screen.getByText('Deck');
      expect(deckText).toBeInTheDocument();
    });

    it('displays "Community" text', () => {
      renderBottomNavbar(<BottomNavbar />);
      const communityText = screen.getByText('Community');
      expect(communityText).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('all navigation links are accessible', () => {
      renderBottomNavbar(<BottomNavbar />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThanOrEqual(4);
      links.forEach((link) => {
        expect(link).toBeVisible();
      });
    });

    it('each link has descriptive text', () => {
      renderBottomNavbar(<BottomNavbar />);
      const homeLinks = screen.getAllByRole('link', { name: /Home/i });
      const collezioneLink = screen.getByRole('link', { name: /Collezione/i });
      const deckLink = screen.getByRole('link', { name: /Deck/i });
      const communityLink = screen.getByRole('link', { name: /Community/i });

      expect(homeLinks.length).toBeGreaterThan(0);
      expect(collezioneLink).toBeInTheDocument();
      expect(deckLink).toBeInTheDocument();
      expect(communityLink).toBeInTheDocument();
    });
  });

  describe('Link visibility', () => {
    it('all links are visible and clickable', () => {
      renderBottomNavbar(<BottomNavbar />);
      const homeLinks = screen.getAllByRole('link', { name: /Home/i });
      const collezioneLink = screen.getByRole('link', { name: /Collezione/i });
      const deckLink = screen.getByRole('link', { name: /^Deck$/i });
      const communityLink = screen.getByRole('link', { name: /Community/i });

      expect(homeLinks[0]).toBeVisible();
      expect(collezioneLink).toBeVisible();
      expect(deckLink).toBeVisible();
      expect(communityLink).toBeVisible();
    });
  });
});
