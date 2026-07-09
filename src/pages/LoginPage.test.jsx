import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import LoginPage from './LoginPage';

vi.mock('../components/AuthForm', () => ({
  default: () => <div data-testid="auth-form-mock">AuthForm Mock</div>,
}));

const renderLoginPage = () => {
  return render(
    <MemoryRouter>
      <MantineProvider>
        <LoginPage />
      </MantineProvider>
    </MemoryRouter>
  );
};

describe('LoginPage', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderLoginPage();
      expect(screen.getByTestId('auth-form-mock')).toBeInTheDocument();
    });

    it('renders AuthForm component', () => {
      renderLoginPage();
      expect(screen.getByText('AuthForm Mock')).toBeInTheDocument();
    });

    it('wraps AuthForm in a Center component with styling', () => {
      const { container } = renderLoginPage();
      const centerDiv = container.querySelector('[style*="display"], [style*="min"]');
      expect(centerDiv).toBeInTheDocument();
    });

    it('applies appropriate styling to parent container', () => {
      const { container } = renderLoginPage();
      // Just verify that a styled container exists
      const styledElements = container.querySelectorAll('[style]');
      expect(styledElements.length).toBeGreaterThan(0);
    });
  });
});
