import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import NotFoundPage from './NotFoundPage';

vi.mock('../components/TopNavbar', () => ({
  default: () => <div data-testid="top-navbar-mock">TopNavbar Mock</div>,
}));

vi.mock('../components/BottomNavbar', () => ({
  default: () => <div data-testid="bottom-navbar-mock">BottomNavbar Mock</div>,
}));

const renderNotFoundPage = () => {
  return render(
    <MemoryRouter>
      <MantineProvider>
        <NotFoundPage />
      </MantineProvider>
    </MemoryRouter>
  );
};

describe('NotFoundPage', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderNotFoundPage();
      expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('renders TopNavbar component', () => {
      renderNotFoundPage();
      expect(screen.getByTestId('top-navbar-mock')).toBeInTheDocument();
    });

    it('renders BottomNavbar component', () => {
      renderNotFoundPage();
      expect(screen.getByTestId('bottom-navbar-mock')).toBeInTheDocument();
    });

    it('displays 404 heading', () => {
      renderNotFoundPage();
      const heading = screen.getByText('404');
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });

    it('displays "Pagina non trovata" heading', () => {
      renderNotFoundPage();
      expect(screen.getByText('Pagina non trovata')).toBeInTheDocument();
    });

    it('displays descriptive message', () => {
      renderNotFoundPage();
      expect(screen.getByText('Ops! La pagina che cerchi non esiste.')).toBeInTheDocument();
    });
  });

  describe('Home button', () => {
    it('renders "Torna alla Home" link', () => {
      renderNotFoundPage();
      const link = screen.getByRole('link', { name: /Torna alla Home/i });
      expect(link).toBeInTheDocument();
    });

    it('link goes to /home', () => {
      renderNotFoundPage();
      const link = screen.getByRole('link', { name: /Torna alla Home/i });
      expect(link).toHaveAttribute('href', '/home');
    });

    it('link is rendered as an anchor element', () => {
      const { container } = renderNotFoundPage();
      const link = container.querySelector('a[href="/home"]');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Layout and styling', () => {
    it('renders with d-flex flex-column min-vh-100 classes', () => {
      const { container } = renderNotFoundPage();
      const mainDiv = container.querySelector('.d-flex.flex-column.min-vh-100');
      expect(mainDiv).toBeInTheDocument();
    });

    it('renders text in light color', () => {
      const { container } = renderNotFoundPage();
      const mainDiv = container.querySelector('.text-light');
      expect(mainDiv).toBeInTheDocument();
    });

    it('displays 404 heading with warning color', () => {
      renderNotFoundPage();
      const heading = screen.getByText('404');
      expect(heading).toHaveClass('text-warning');
    });
  });
});
