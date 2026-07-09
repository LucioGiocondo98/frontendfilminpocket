import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import ImageUpload from './ImageUpload';

const renderWithMantine = (component) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('ImageUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('FileInput field rendering', () => {
    it('renders FileInput with label "Immagine"', () => {
      const onImageChange = vi.fn();
      renderWithMantine(
        <ImageUpload
          imageFile={null}
          onImageChange={onImageChange}
          currentImageUrl={null}
        />
      );
      expect(screen.getByText('Immagine')).toBeInTheDocument();
    });

    it('renders FileInput with accept="image/*" attribute', () => {
      const onImageChange = vi.fn();
      const { container } = renderWithMantine(
        <ImageUpload
          imageFile={null}
          onImageChange={onImageChange}
          currentImageUrl={null}
        />
      );
      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).toHaveAttribute('accept', 'image/*');
    });
  });

  describe('Description text - no image', () => {
    it('displays "Nessuna immagine attuale." when no image is selected or current', () => {
      const onImageChange = vi.fn();
      renderWithMantine(
        <ImageUpload
          imageFile={null}
          onImageChange={onImageChange}
          currentImageUrl={null}
        />
      );
      expect(screen.getByText('Nessuna immagine attuale.')).toBeInTheDocument();
    });
  });

  describe('Description text - new image selected', () => {
    it('displays "Nuova immagine selezionata." when imageFile is set', () => {
      const onImageChange = vi.fn();
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      renderWithMantine(
        <ImageUpload
          imageFile={file}
          onImageChange={onImageChange}
          currentImageUrl={null}
        />
      );
      expect(screen.getByText('Nuova immagine selezionata.')).toBeInTheDocument();
    });

    it('takes precedence over currentImageUrl', () => {
      const onImageChange = vi.fn();
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      renderWithMantine(
        <ImageUpload
          imageFile={file}
          onImageChange={onImageChange}
          currentImageUrl="https://example.com/image.jpg"
        />
      );
      expect(screen.getByText('Nuova immagine selezionata.')).toBeInTheDocument();
      expect(screen.queryByText('Immagine attuale mantenuta se non cambiata.')).not.toBeInTheDocument();
    });
  });

  describe('Description text - current image exists', () => {
    it('displays "Immagine attuale mantenuta se non cambiata." when currentImageUrl is set', () => {
      const onImageChange = vi.fn();
      renderWithMantine(
        <ImageUpload
          imageFile={null}
          onImageChange={onImageChange}
          currentImageUrl="https://example.com/image.jpg"
        />
      );
      expect(screen.getByText('Immagine attuale mantenuta se non cambiata.')).toBeInTheDocument();
    });

    it('does not show current image message when imageFile is set', () => {
      const onImageChange = vi.fn();
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      renderWithMantine(
        <ImageUpload
          imageFile={file}
          onImageChange={onImageChange}
          currentImageUrl="https://example.com/image.jpg"
        />
      );
      expect(screen.queryByText('Immagine attuale mantenuta se non cambiata.')).not.toBeInTheDocument();
    });
  });

  describe('File selection', () => {
    it('component accepts file input', async () => {
      const user = userEvent.setup();
      const onImageChange = vi.fn();
      const { container } = renderWithMantine(
        <ImageUpload
          imageFile={null}
          onImageChange={onImageChange}
          currentImageUrl={null}
        />
      );

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const fileInput = container.querySelector('input[type="file"]');

      if (fileInput) {
        await user.upload(fileInput, file);
        expect(onImageChange).toHaveBeenCalled();
      }
    });

    it('onImageChange receives synthetic event with files array', async () => {
      const user = userEvent.setup();
      const onImageChange = vi.fn();
      const { container } = renderWithMantine(
        <ImageUpload
          imageFile={null}
          onImageChange={onImageChange}
          currentImageUrl={null}
        />
      );

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const fileInput = container.querySelector('input[type="file"]');

      if (fileInput) {
        await user.upload(fileInput, file);

        const call = onImageChange.mock.calls[0];
        expect(call).toBeDefined();
        expect(call[0]).toHaveProperty('target');
        expect(call[0].target).toHaveProperty('files');
      }
    });
  });

  describe('Component props', () => {
    it('accepts imageFile prop', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const onImageChange = vi.fn();
      renderWithMantine(
        <ImageUpload
          imageFile={file}
          onImageChange={onImageChange}
          currentImageUrl={null}
        />
      );
      expect(screen.getByText('Nuova immagine selezionata.')).toBeInTheDocument();
    });

    it('accepts currentImageUrl prop', () => {
      const onImageChange = vi.fn();
      renderWithMantine(
        <ImageUpload
          imageFile={null}
          onImageChange={onImageChange}
          currentImageUrl="https://example.com/image.jpg"
        />
      );
      expect(screen.getByText('Immagine attuale mantenuta se non cambiata.')).toBeInTheDocument();
    });

    it('accepts onImageChange callback', () => {
      const onImageChange = vi.fn();
      renderWithMantine(
        <ImageUpload
          imageFile={null}
          onImageChange={onImageChange}
          currentImageUrl={null}
        />
      );
      expect(onImageChange).toBeDefined();
    });
  });
});
