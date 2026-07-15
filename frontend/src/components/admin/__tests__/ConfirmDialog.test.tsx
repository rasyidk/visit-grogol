import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

describe('ConfirmDialog', () => {
  it('does not render its content when closed', () => {
    render(<ConfirmDialog open={false} onConfirm={jest.fn()} onClose={jest.fn()} />);
    expect(screen.queryByText(/Ya, Hapus/i)).not.toBeInTheDocument();
  });

  it('renders the message and confirm button when open', () => {
    render(<ConfirmDialog open message="Hapus destinasi?" onConfirm={jest.fn()} onClose={jest.fn()} />);
    expect(screen.getByText('Hapus destinasi?')).toBeInTheDocument();
  });

  it('fires onConfirm and onClose from the respective buttons', async () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();
    render(<ConfirmDialog open onConfirm={onConfirm} onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /Ya, Hapus/i }));
    expect(onConfirm).toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: /Batal/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
