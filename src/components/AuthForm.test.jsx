import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import AuthForm from './AuthForm';

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderAuthForm = () => {
  return render(
    <MemoryRouter>
      <MantineProvider>
        <AuthForm />
      </MantineProvider>
    </MemoryRouter>
  );
};

describe('AuthForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initial render', () => {
    it('renders in login mode by default', () => {
      renderAuthForm();
      expect(screen.getByText('FilmInPocket')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Azione!/i })).toBeInTheDocument();
    });

    it('renders username input', () => {
      renderAuthForm();
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    });

    it('renders password input', () => {
      renderAuthForm();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('does not render email input in login mode', () => {
      renderAuthForm();
      expect(screen.queryByPlaceholderText('Email')).not.toBeInTheDocument();
    });

    it('renders toggle link to register', () => {
      renderAuthForm();
      expect(screen.getByText('Non hai un account?')).toBeInTheDocument();
      expect(screen.getByText('Registrati')).toBeInTheDocument();
    });
  });

  describe('Login mode', () => {
    it('has login button labeled "Azione!"', () => {
      renderAuthForm();
      expect(screen.getByRole('button', { name: /Azione!/i })).toBeInTheDocument();
    });

    it('toggles to register mode when clicking toggle link', async () => {
      const user = userEvent.setup();
      renderAuthForm();

      const registerToggle = screen.getByText('Registrati');
      await user.click(registerToggle);

      expect(screen.getByText('Hai già un account?')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    });
  });

  describe('Register mode', () => {
    it('toggles to register mode and shows email field', async () => {
      const user = userEvent.setup();
      renderAuthForm();

      const registerToggle = screen.getByText('Registrati');
      await user.click(registerToggle);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      });
    });

    it('shows register button in register mode', async () => {
      const user = userEvent.setup();
      renderAuthForm();

      const registerToggle = screen.getByText('Registrati');
      await user.click(registerToggle);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Registrati/i })).toBeInTheDocument();
      });
    });

    it('hides email when toggling back to login', async () => {
      const user = userEvent.setup();
      renderAuthForm();

      // Go to register
      const registerToggle = screen.getByText('Registrati');
      await user.click(registerToggle);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      });

      // Go back to login
      const loginToggle = screen.getByText('Accedi');
      await user.click(loginToggle);

      expect(screen.queryByPlaceholderText('Email')).not.toBeInTheDocument();
    });
  });

  describe('Login submission', () => {
    it('calls fetch with login endpoint when submitting login form', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ accessToken: 'test-token', user: { id: 1, username: 'test' } }),
      });

      renderAuthForm();

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /Azione!/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/auth/login'),
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'testuser', password: 'password123' }),
          })
        );
      });
    });

    it('calls login hook with token and user on successful login', async () => {
      const user = userEvent.setup();
      const mockUser = { id: 1, username: 'test' };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ accessToken: 'test-token', user: mockUser }),
      });

      renderAuthForm();

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /Azione!/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test-token', mockUser);
      });
    });

    it('navigates to /home after successful login', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ accessToken: 'test-token', user: { id: 1, username: 'test' } }),
      });

      renderAuthForm();

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /Azione!/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/home');
      });
    });

    it('shows success toast on successful login', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ accessToken: 'test-token', user: { id: 1, username: 'test' } }),
      });

      renderAuthForm();

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /Azione!/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Login effettuato con successo!')).toBeInTheDocument();
      });
    });

    it('shows error toast on failed login', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Credenziali non valide' }),
      });

      renderAuthForm();

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /Azione!/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Credenziali non valide')).toBeInTheDocument();
      });
    });
  });

  describe('Register submission', () => {
    it('calls fetch with register endpoint when submitting register form', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 201,
        json: async () => ({}),
      });

      renderAuthForm();

      // Switch to register mode
      const registerToggle = screen.getByText('Registrati');
      await user.click(registerToggle);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      });

      const usernameInput = screen.getByPlaceholderText('Username');
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /Registrati/i });

      await user.type(usernameInput, 'newuser');
      await user.type(emailInput, 'newuser@test.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/auth/register'),
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: 'newuser',
              email: 'newuser@test.com',
              password: 'password123',
            }),
          })
        );
      });
    });

    it('switches back to login mode after successful registration', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 201,
        json: async () => ({}),
      });

      renderAuthForm();

      // Switch to register mode
      const registerToggle = screen.getByText('Registrati');
      await user.click(registerToggle);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      });

      const usernameInput = screen.getByPlaceholderText('Username');
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /Registrati/i });

      await user.type(usernameInput, 'newuser');
      await user.type(emailInput, 'newuser@test.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByPlaceholderText('Email')).not.toBeInTheDocument();
      });
    });

    it('navigates to / after successful registration', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 201,
        json: async () => ({}),
      });

      renderAuthForm();

      const registerToggle = screen.getByText('Registrati');
      await user.click(registerToggle);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      });

      const usernameInput = screen.getByPlaceholderText('Username');
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /Registrati/i });

      await user.type(usernameInput, 'newuser');
      await user.type(emailInput, 'newuser@test.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });

    it('shows success toast on successful registration', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 201,
        json: async () => ({}),
      });

      renderAuthForm();

      const registerToggle = screen.getByText('Registrati');
      await user.click(registerToggle);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      });

      const usernameInput = screen.getByPlaceholderText('Username');
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /Registrati/i });

      await user.type(usernameInput, 'newuser');
      await user.type(emailInput, 'newuser@test.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Registrazione completata! Ora puoi effettuare il login.')).toBeInTheDocument();
      });
    });

    it('shows error toast on failed registration', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 409,
        json: async () => ({ message: 'Username già utilizzato' }),
      });

      renderAuthForm();

      const registerToggle = screen.getByText('Registrati');
      await user.click(registerToggle);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      });

      const usernameInput = screen.getByPlaceholderText('Username');
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /Registrati/i });

      await user.type(usernameInput, 'existinguser');
      await user.type(emailInput, 'existing@test.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Username già utilizzato')).toBeInTheDocument();
      });
    });
  });

  describe('Form state management', () => {
    it('updates username input value on change', async () => {
      const user = userEvent.setup();
      renderAuthForm();

      const usernameInput = screen.getByPlaceholderText('Username');
      await user.type(usernameInput, 'testuser');

      expect(usernameInput).toHaveValue('testuser');
    });

    it('updates password input value on change', async () => {
      const user = userEvent.setup();
      renderAuthForm();

      const passwordInput = screen.getByPlaceholderText('Password');
      await user.type(passwordInput, 'testpass');

      expect(passwordInput).toHaveValue('testpass');
    });

    it('updates email input value on change in register mode', async () => {
      const user = userEvent.setup();
      renderAuthForm();

      const registerToggle = screen.getByText('Registrati');
      await user.click(registerToggle);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      });

      const emailInput = screen.getByPlaceholderText('Email');
      await user.type(emailInput, 'test@test.com');

      expect(emailInput).toHaveValue('test@test.com');
    });
  });
});
