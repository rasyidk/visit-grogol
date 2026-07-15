import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Simpan</Button>);
    expect(screen.getByRole('button', { name: 'Simpan' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Klik</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled and shows a spinner while loading', () => {
    render(<Button loading>Kirim</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies the variant class', () => {
    render(<Button variant="secondary">X</Button>);
    expect(screen.getByRole('button').className).toContain('btn-secondary');
  });
});
