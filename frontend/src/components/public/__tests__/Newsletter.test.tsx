import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Newsletter } from '@/components/public/Newsletter';
import { createOne } from '@/lib/api';
import { toast } from 'sonner';

jest.mock('@/lib/api', () => ({
  createOne: jest.fn(),
  getApiErrorMessage: jest.fn(() => 'error'),
}));
jest.mock('sonner', () => ({ toast: { success: jest.fn(), error: jest.fn() } }));

describe('Newsletter', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders the default heading', () => {
    render(<Newsletter />);
    expect(screen.getByText(/Rencanakan Akhir Pekan/i)).toBeInTheDocument();
  });

  it('submits the email and shows a success toast', async () => {
    (createOne as jest.Mock).mockResolvedValueOnce({ id: 1 });
    render(<Newsletter />);
    await userEvent.type(screen.getByPlaceholderText(/Alamat email/i), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Berlangganan/i }));
    expect(createOne).toHaveBeenCalledWith('/newsletter', { email: 'test@example.com' });
    expect(toast.success).toHaveBeenCalled();
  });

  it('shows an error toast when the request fails', async () => {
    (createOne as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    render(<Newsletter />);
    await userEvent.type(screen.getByPlaceholderText(/Alamat email/i), 'x@y.co');
    await userEvent.click(screen.getByRole('button', { name: /Berlangganan/i }));
    expect(toast.error).toHaveBeenCalled();
  });
});
