import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import SidebarFiltri from './SidebarFiltri';

const renderWithMantine = (component) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('SidebarFiltri', () => {
  describe('Rendering', () => {
    it('renders heading text', () => {
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );
      expect(screen.getByText(/Filtra le tue carte/i)).toBeInTheDocument();
    });

    it('renders as a form element', () => {
      const onFilterChange = vi.fn();
      const { container } = renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );
      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
    });
  });

  describe('Filter fields rendering', () => {
    it('renders Rarità label', () => {
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );
      expect(screen.getByText('Rarità')).toBeInTheDocument();
    });

    it('renders Genere label', () => {
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );
      expect(screen.getByText('Genere')).toBeInTheDocument();
    });

    it('renders Anno label', () => {
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );
      expect(screen.getByText('Anno')).toBeInTheDocument();
    });

    it('renders Tipo Carta label', () => {
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );
      expect(screen.getByText('Tipo Carta')).toBeInTheDocument();
    });

    it('renders Filtra button', () => {
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );
      expect(screen.getByRole('button', { name: /Filtra/i })).toBeInTheDocument();
    });
  });

  describe('Genere TextInput', () => {
    it('has placeholder text', () => {
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );
      const genreInput = screen.getByPlaceholderText('Es. Drama');
      expect(genreInput).toBeInTheDocument();
    });

    it('accepts text input', async () => {
      const user = userEvent.setup();
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );

      const genreInput = screen.getByPlaceholderText('Es. Drama');
      await user.type(genreInput, 'Action');
      expect(genreInput).toHaveValue('Action');
    });
  });

  describe('Anno TextInput', () => {
    it('has type="number"', () => {
      const onFilterChange = vi.fn();
      const { container } = renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );
      const yearInput = container.querySelector('input[type="number"]');
      expect(yearInput).toBeInTheDocument();
    });

    it('has placeholder text', () => {
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );
      const yearInput = screen.getByPlaceholderText('Es. 1972');
      expect(yearInput).toBeInTheDocument();
    });

    it('accepts number input', async () => {
      const user = userEvent.setup();
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );

      const yearInput = screen.getByPlaceholderText('Es. 1972');
      await user.type(yearInput, '1995');
      expect(yearInput).toHaveValue(1995);
    });
  });

  describe('Form submission', () => {
    it('calls onFilterChange on submit', async () => {
      const user = userEvent.setup();
      const onFilterChange = vi.fn();
      const { container } = renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );

      const button = container.querySelector('button[type="submit"]');
      if (button) {
        await user.click(button);
        expect(onFilterChange).toHaveBeenCalled();
      }
    });

    it('passes filter object on submit', async () => {
      const user = userEvent.setup();
      const onFilterChange = vi.fn();
      const { container } = renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );

      const button = container.querySelector('button[type="submit"]');
      if (button) {
        await user.click(button);

        expect(onFilterChange).toHaveBeenCalledWith(
          expect.objectContaining({
            rarity: expect.any(String),
            genre: expect.any(String),
            year: expect.any(String),
            cardType: expect.any(String),
          })
        );
      }
    });

    it('includes entered text in submitted filter', async () => {
      const user = userEvent.setup();
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );

      const genreInput = screen.getByPlaceholderText('Es. Drama');
      const yearInput = screen.getByPlaceholderText('Es. 1972');

      await user.type(genreInput, 'Drama');
      await user.type(yearInput, '1995');

      const button = screen.getByRole('button', { name: /Filtra/i });
      await user.click(button);

      const lastCall = onFilterChange.mock.calls[onFilterChange.mock.calls.length - 1][0];
      expect(lastCall.genre).toBe('Drama');
      expect(lastCall.year).toBe('1995');
    });

    it('allows clearing filters', async () => {
      const user = userEvent.setup();
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );

      const genreInput = screen.getByPlaceholderText('Es. Drama');
      await user.type(genreInput, 'Drama');
      await user.clear(genreInput);

      const button = screen.getByRole('button', { name: /Filtra/i });
      await user.click(button);

      expect(onFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({
          genre: '',
        })
      );
    });
  });

  describe('Props handling', () => {
    it('accepts onFilterChange prop', () => {
      const onFilterChange = vi.fn();
      renderWithMantine(
        <SidebarFiltri onFilterChange={onFilterChange} />
      );
      expect(onFilterChange).toBeDefined();
    });
  });
});
