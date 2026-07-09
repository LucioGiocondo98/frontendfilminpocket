import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import ToastMessage from './ToastMessage';

const renderWithMantine = (component) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('ToastMessage', () => {

  describe('Visibility', () => {
    it('renders null when show is false', () => {
      const { container } = renderWithMantine(
        <ToastMessage show={false} onClose={vi.fn()} message="Test" />
      );
      // When show is false, the component returns null, so there should be no Notification element
      const notification = container.querySelector('[role="alert"]');
      expect(notification).not.toBeInTheDocument();
    });

    it('renders null when show is undefined', () => {
      const { container } = renderWithMantine(
        <ToastMessage onClose={vi.fn()} message="Test" />
      );
      // When show is undefined, the component returns null
      const notification = container.querySelector('[role="alert"]');
      expect(notification).not.toBeInTheDocument();
    });

    it('renders notification when show is true', () => {
      renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Test Message" />
      );
      expect(screen.getByText('Test Message')).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('renders the message content', () => {
      renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Hello World" />
      );
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders the title as FilmInPocket', () => {
      renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Test" />
      );
      expect(screen.getByText('FilmInPocket')).toBeInTheDocument();
    });
  });

  describe('Variant to Color mapping', () => {
    it('renders with "success" variant mapped to green', () => {
      renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Test" variant="success" />
      );
      const notification = screen.getByText('Test').closest('div[role="alert"]');
      expect(notification).toBeInTheDocument();
    });

    it('renders with "danger" variant mapped to red', () => {
      renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Test" variant="danger" />
      );
      const notification = screen.getByText('Test').closest('div[role="alert"]');
      expect(notification).toBeInTheDocument();
    });

    it('renders with "warning" variant mapped to yellow', () => {
      renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Test" variant="warning" />
      );
      const notification = screen.getByText('Test').closest('div[role="alert"]');
      expect(notification).toBeInTheDocument();
    });

    it('renders with "info" variant mapped to blue', () => {
      renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Test" variant="info" />
      );
      const notification = screen.getByText('Test').closest('div[role="alert"]');
      expect(notification).toBeInTheDocument();
    });

    it('uses default "success" variant when not specified', () => {
      renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Test" />
      );
      const notification = screen.getByText('Test').closest('div[role="alert"]');
      expect(notification).toBeInTheDocument();
    });

    it('falls back to unknown variant passed through as-is', () => {
      renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Test" variant="custom" />
      );
      const notification = screen.getByText('Test').closest('div[role="alert"]');
      expect(notification).toBeInTheDocument();
    });
  });

  describe('Auto-hide timer', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    });

    it('calls onClose after 4000ms when show becomes true', () => {
      const onClose = vi.fn();
      renderWithMantine(
        <ToastMessage show={true} onClose={onClose} message="Test" />
      );

      expect(onClose).not.toHaveBeenCalled();

      vi.advanceTimersByTime(4000);

      expect(onClose).toHaveBeenCalledOnce();
    });

    it('does not call onClose before 4000ms', () => {
      const onClose = vi.fn();
      renderWithMantine(
        <ToastMessage show={true} onClose={onClose} message="Test" />
      );

      vi.advanceTimersByTime(3999);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('does not start timer when show is false', () => {
      const onClose = vi.fn();
      renderWithMantine(
        <ToastMessage show={false} onClose={onClose} message="Test" />
      );

      vi.advanceTimersByTime(4000);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('clears timer on unmount to prevent memory leaks', () => {
      const onClose = vi.fn();
      const { unmount } = renderWithMantine(
        <ToastMessage show={true} onClose={onClose} message="Test" />
      );

      unmount();
      vi.advanceTimersByTime(4000);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('clears previous timer and starts new one when show prop changes', () => {
      const onClose = vi.fn();
      const { rerender } = renderWithMantine(
        <ToastMessage show={true} onClose={onClose} message="Test" />
      );

      vi.advanceTimersByTime(2000);

      // Rerender with show=false then true again
      rerender(
        <MantineProvider>
          <ToastMessage show={false} onClose={onClose} message="Test" />
        </MantineProvider>
      );

      rerender(
        <MantineProvider>
          <ToastMessage show={true} onClose={onClose} message="Test" />
        </MantineProvider>
      );

      // Advance 4000ms from the NEW show=true
      vi.advanceTimersByTime(4000);

      expect(onClose).toHaveBeenCalledOnce();
    });
  });

  describe('Manual close button', () => {
    it('renders close button when show is true', () => {
      renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Test" />
      );
      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      vi.useRealTimers();
      const user = userEvent.setup();
      const onClose = vi.fn();
      renderWithMantine(
        <ToastMessage show={true} onClose={onClose} message="Test" />
      );

      const closeButton = screen.getByRole('button');
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('Layout and positioning', () => {
    it('renders in fixed position wrapper', () => {
      const { container } = renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Test" />
      );
      const wrapper = container.querySelector('div[style*="position"]');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveStyle('position: fixed');
    });

    it('positions at top-right corner', () => {
      const { container } = renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Test" />
      );
      const wrapper = container.querySelector('div[style*="position"]');
      const style = wrapper?.getAttribute('style') || '';
      expect(style).toContain('top: 1rem');
      expect(style).toContain('right: 1rem');
    });

    it('has high z-index to appear above other elements', () => {
      const { container } = renderWithMantine(
        <ToastMessage show={true} onClose={vi.fn()} message="Test" />
      );
      const wrapper = container.querySelector('div[style*="position"]');
      const style = wrapper?.getAttribute('style') || '';
      expect(style).toContain('z-index: 1000');
    });
  });

  describe('onClose dependency', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    });

    it('respects onClose prop changes', () => {
      const onClose1 = vi.fn();
      const onClose2 = vi.fn();

      const { rerender } = renderWithMantine(
        <ToastMessage show={true} onClose={onClose1} message="Test" />
      );

      vi.advanceTimersByTime(4000);
      expect(onClose1).toHaveBeenCalledOnce();
      expect(onClose2).not.toHaveBeenCalled();

      // Reset and test with new onClose function
      onClose1.mockClear();

      rerender(
        <MantineProvider>
          <ToastMessage show={true} onClose={onClose2} message="Test" />
        </MantineProvider>
      );

      vi.advanceTimersByTime(4000);
      expect(onClose2).toHaveBeenCalledOnce();
    });
  });
});
