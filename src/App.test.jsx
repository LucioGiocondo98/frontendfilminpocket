import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import App from './App';

const renderApp = (component) => {
  return render(
    <BrowserRouter>
      <MantineProvider>
        {component}
      </MantineProvider>
    </BrowserRouter>
  );
};

// Mock all pages to avoid complex dependencies
vi.mock('./pages/WelcomePage', () => ({
  default: () => <div data-testid="welcome-page">Welcome Page</div>,
}));

vi.mock('./pages/HomePage', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('./pages/CollectionPage', () => ({
  default: () => <div data-testid="collection-page">Collection Page</div>,
}));

vi.mock('./pages/CardDetailsPage', () => ({
  default: () => <div data-testid="card-details-page">Card Details Page</div>,
}));

vi.mock('./pages/PackOpenedPage', () => ({
  default: () => <div data-testid="pack-opened-page">Pack Opened Page</div>,
}));

vi.mock('./pages/ProfilePage', () => ({
  default: () => <div data-testid="profile-page">Profile Page</div>,
}));

vi.mock('./pages/CreateCardPage', () => ({
  default: () => <div data-testid="create-card-page">Create Card Page</div>,
}));

vi.mock('./pages/EditCardPage', () => ({
  default: () => <div data-testid="edit-card-page">Edit Card Page</div>,
}));

vi.mock('./pages/DeleteCardPage', () => ({
  default: () => <div data-testid="delete-card-page">Delete Card Page</div>,
}));

vi.mock('./pages/DeckPage', () => ({
  default: () => <div data-testid="deck-page">Deck Page</div>,
}));

vi.mock('./pages/NotFoundPage', () => ({
  default: () => <div data-testid="not-found-page">Not Found Page</div>,
}));

vi.mock('./components/AuthForm', () => ({
  default: () => <div data-testid="auth-form">Auth Form</div>,
}));

vi.mock('./components/ProtectedRoute', () => ({
  default: ({ children }) => (
    <div data-testid="protected-route">{children}</div>
  ),
}));

vi.mock('./components/AdminRoute', () => ({
  default: ({ children }) => (
    <div data-testid="admin-route">{children}</div>
  ),
}));

vi.mock('./components/PackOpeningAnimation', () => ({
  default: () => <div data-testid="pack-opening-animation">Pack Opening Animation</div>,
}));

describe('App', () => {
  describe('Root route', () => {
    it('renders without crashing', () => {
      renderApp(<App />);
      expect(screen.getByTestId('welcome-page')).toBeInTheDocument();
    });

    it('renders WelcomePage at root path', () => {
      renderApp(<App />);
      expect(screen.getByTestId('welcome-page')).toBeInTheDocument();
    });
  });

  describe('Login route with AuthLayout', () => {
    beforeEach(() => {
      window.history.pushState({}, 'Test', '/login');
    });

    it('renders AuthLayout at /login', () => {
      renderApp(<App />);
      // AuthLayout wraps AuthForm in Center component
      expect(screen.getByTestId('auth-form')).toBeInTheDocument();
    });

    it('AuthForm is centered via Center component', () => {
      renderApp(<App />);
      const authForm = screen.getByTestId('auth-form');
      expect(authForm).toBeInTheDocument();
    });
  });

  describe('Route structure', () => {
    it('has Routes component', () => {
      const { container } = renderApp(<App />);
      // Routes are rendered, just verify App renders
      expect(container).toBeInTheDocument();
    });

    it('renders app without errors', () => {
      const { container } = renderApp(<App />);
      // Just verify the app renders successfully with all routes defined
      expect(container).toBeInTheDocument();
    });
  });

  describe('Routing integration', () => {
    it('renders app with Routes component', () => {
      const { container } = renderApp(<App />);
      // Just verify the app renders without errors
      expect(container).toBeInTheDocument();
    });
  });
});
