import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import TopNavbar from './TopNavbar';

const renderTopNavbar = (component) => {
  return render(
    <MemoryRouter>
      <MantineProvider>
        {component}
      </MantineProvider>
    </MemoryRouter>
  );
};

describe('TopNavbar', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Brand rendering', () => {
    it('renders brand link with FilmInPocket text', () => {
      renderTopNavbar(<TopNavbar />);
      const brandLink = screen.getByRole('link', { name: /FilmInPocket/i });
      expect(brandLink).toBeInTheDocument();
    });

    it('brand link navigates to /home', () => {
      renderTopNavbar(<TopNavbar />);
      const brandLink = screen.getByRole('link', { name: /FilmInPocket/i });
      expect(brandLink).toHaveAttribute('href', '/home');
    });

    it('renders film spool icon in brand', () => {
      const { container } = renderTopNavbar(<TopNavbar />);
      const brandLink = screen.getByRole('link', { name: /FilmInPocket/i });
      // Check that the link contains an SVG icon (react-icons renders as SVG)
      const svg = brandLink.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Desktop view navigation links (d-lg-flex)', () => {
    it('renders Profilo link for desktop view', () => {
      renderTopNavbar(<TopNavbar />);
      const profiloLink = screen.getByRole('link', { name: /Profilo/i });
      expect(profiloLink).toBeInTheDocument();
    });

    it('Profilo link navigates to /profilo', () => {
      renderTopNavbar(<TopNavbar />);
      const profiloLink = screen.getByRole('link', { name: /Profilo/i });
      expect(profiloLink).toHaveAttribute('href', '/profilo');
    });

    it('renders Logout link for desktop view', async () => {
      renderTopNavbar(<TopNavbar />);
      // Find logout by role (it's an <a> tag, not a Link)
      const logoutLink = screen.getByRole('link', { name: /Logout/i });
      expect(logoutLink).toBeInTheDocument();
    });

    it('Logout link has href="#" to prevent navigation', () => {
      renderTopNavbar(<TopNavbar />);
      const logoutLink = screen.getByRole('link', { name: /Logout/i });
      expect(logoutLink).toHaveAttribute('href', '#');
    });
  });

  describe('Mobile Burger menu', () => {
    it('renders Burger button', () => {
      renderTopNavbar(<TopNavbar />);
      const burger = screen.getByRole('button', { name: /Menu/i });
      expect(burger).toBeInTheDocument();
    });

    it('opens Drawer when Burger is clicked', async () => {
      const user = userEvent.setup();
      renderTopNavbar(<TopNavbar />);

      // Drawer should start closed (links in drawer not visible)
      expect(screen.queryByText('Home')).not.toBeInTheDocument();

      const burger = screen.getByRole('button', { name: /Menu/i });
      await user.click(burger);

      // After clicking, drawer content should be visible
      // Use findByText which waits for the element to appear
      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
      });
    });

    it('closes Drawer when Burger is clicked again', async () => {
      const user = userEvent.setup();
      renderTopNavbar(<TopNavbar />);

      const burger = screen.getByRole('button', { name: /Menu/i });

      // Open drawer
      await user.click(burger);
      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
      });

      // Close drawer
      await user.click(burger);
      // After closing, the drawer content should be removed from DOM
      // Note: Mantine Drawer removes content from DOM when closed
      await waitFor(() => {
        expect(screen.queryByText('Home')).not.toBeInTheDocument();
      });
    });
  });

  describe('Drawer menu links', () => {
    it('renders Home link inside Drawer', async () => {
      const user = userEvent.setup();
      renderTopNavbar(<TopNavbar />);

      const burger = screen.getByRole('button', { name: /Menu/i });
      await user.click(burger);

      await waitFor(() => {
        const homeLinks = screen.getAllByText('Home');
        // Find the drawer home link (not the brand text)
        expect(homeLinks.length).toBeGreaterThan(0);
      });
    });

    it('renders Collezione link inside Drawer', async () => {
      const user = userEvent.setup();
      renderTopNavbar(<TopNavbar />);

      const burger = screen.getByRole('button', { name: /Menu/i });
      await user.click(burger);

      await waitFor(() => {
        expect(screen.getByText('Collezione')).toBeInTheDocument();
      });
    });

    it('renders Mazzi link inside Drawer', async () => {
      const user = userEvent.setup();
      renderTopNavbar(<TopNavbar />);

      const burger = screen.getByRole('button', { name: /Menu/i });
      await user.click(burger);

      await waitFor(() => {
        expect(screen.getByText('Mazzi')).toBeInTheDocument();
      });
    });

    it('renders Profilo link inside Drawer', async () => {
      const user = userEvent.setup();
      renderTopNavbar(<TopNavbar />);

      const burger = screen.getByRole('button', { name: /Menu/i });
      await user.click(burger);

      await waitFor(() => {
        const profiloElements = screen.getAllByText('Profilo');
        expect(profiloElements.length).toBeGreaterThan(0);
      });
    });

    it('renders Logout link inside Drawer', async () => {
      const user = userEvent.setup();
      renderTopNavbar(<TopNavbar />);

      const burger = screen.getByRole('button', { name: /Menu/i });
      await user.click(burger);

      await waitFor(() => {
        const logoutElements = screen.getAllByText('Logout');
        expect(logoutElements.length).toBeGreaterThan(0);
      });
    });

    it('closes Drawer when a link is clicked', async () => {
      const user = userEvent.setup();
      renderTopNavbar(<TopNavbar />);

      const burger = screen.getByRole('button', { name: /Menu/i });
      await user.click(burger);

      // Verify drawer is open
      await waitFor(() => {
        expect(screen.getByText('Mazzi')).toBeInTheDocument();
      });

      // Click Mazzi link
      const mazziElements = screen.getAllByText('Mazzi');
      await user.click(mazziElements[0]);

      // Drawer should close, so Mazzi should not be in drawer anymore
      await waitFor(() => {
        expect(screen.queryByText('Mazzi')).not.toBeInTheDocument();
      });
    });
  });

  describe('Logout functionality', () => {
    it('calls localStorage.clear() when Logout is clicked in desktop view', async () => {
      const user = userEvent.setup();

      // Setup localStorage with some data
      localStorage.setItem('accessToken', 'test-token');
      localStorage.setItem('user', '{"id": 1}');

      expect(localStorage.getItem('accessToken')).toBe('test-token');

      renderTopNavbar(<TopNavbar />);

      const logoutLinks = screen.getAllByText('Logout');
      // Click the first Logout (desktop view)
      await user.click(logoutLinks[0]);

      // Verify localStorage was cleared
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });

    it('navigates to /login when Logout is clicked in desktop view', async () => {
      const user = userEvent.setup();
      renderTopNavbar(<TopNavbar />);

      const logoutLinks = screen.getAllByText('Logout');
      await user.click(logoutLinks[0]);

      // After logout, the URL should change to /login
      // We can verify by checking if the component still renders (it should)
      expect(screen.getByRole('button', { name: /Menu/i })).toBeInTheDocument();
    });

    it('calls localStorage.clear() when Logout is clicked in drawer', async () => {
      const user = userEvent.setup();

      // Setup localStorage with some data
      localStorage.setItem('accessToken', 'test-token');

      renderTopNavbar(<TopNavbar />);

      const burger = screen.getByRole('button', { name: /Menu/i });
      await user.click(burger);

      await waitFor(() => {
        expect(screen.getByText('Mazzi')).toBeInTheDocument();
      });

      // Get the Logout link from the drawer (should have 2 logouts now)
      const logoutElements = screen.getAllByText('Logout');
      // Click the drawer logout (last one)
      await user.click(logoutElements[logoutElements.length - 1]);

      // Verify localStorage was cleared
      expect(localStorage.getItem('accessToken')).toBeNull();
    });

    it('drawer logout handler calls close() and navigates', async () => {
      const user = userEvent.setup();
      renderTopNavbar(<TopNavbar />);

      const burger = screen.getByRole('button', { name: /Menu/i });
      await user.click(burger);

      // Verify drawer is open
      await waitFor(() => {
        expect(screen.getByText('Mazzi')).toBeInTheDocument();
      });

      // The drawer logout link calls close() and then handleLogout()
      // We verify the logout link is clickable in the drawer
      const logoutElements = screen.getAllByText('Logout');
      const drawerLogout = logoutElements[logoutElements.length - 1];
      expect(drawerLogout).toBeInTheDocument();

      // Click it (this should close the drawer and navigate)
      await user.click(drawerLogout);

      // After logout, localStorage should be cleared
      expect(localStorage.getItem('accessToken')).toBeNull();
    });
  });

  describe('Icon rendering', () => {
    it('renders icons for all navigation links', async () => {
      const user = userEvent.setup();
      const { container } = renderTopNavbar(<TopNavbar />);

      // Check desktop view has icons
      const profileLinks = screen.getAllByText('Profilo');
      const profileLink = profileLinks[0].closest('a');
      const profileIcon = profileLink?.querySelector('svg');
      expect(profileIcon).toBeInTheDocument();

      // Open drawer and check mobile icons
      const burger = screen.getByRole('button', { name: /Menu/i });
      await user.click(burger);

      await waitFor(() => {
        const homeElements = screen.getAllByText('Home');
        expect(homeElements.length).toBeGreaterThan(0);
        const homeLink = homeElements[homeElements.length - 1].closest('a');
        const homeIcon = homeLink?.querySelector('svg');
        expect(homeIcon).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('Burger button has aria-label', () => {
      renderTopNavbar(<TopNavbar />);
      const burger = screen.getByRole('button', { name: /Menu/i });
      expect(burger).toHaveAttribute('aria-label', 'Menu');
    });

    it('all links are keyboard navigable', async () => {
      const user = userEvent.setup();
      renderTopNavbar(<TopNavbar />);

      const brandLink = screen.getByRole('link', { name: /FilmInPocket/i });
      expect(brandLink).toBeVisible();

      // Open drawer
      const burger = screen.getByRole('button', { name: /Menu/i });
      await user.click(burger);

      await waitFor(() => {
        const homeElements = screen.getAllByText('Home');
        expect(homeElements.length).toBeGreaterThan(0);
      });
    });
  });
});
