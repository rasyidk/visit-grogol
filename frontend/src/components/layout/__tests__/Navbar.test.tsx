import { render, screen } from '@testing-library/react';
import { Navbar } from '@/components/layout/Navbar';

jest.mock('next/navigation', () => ({ usePathname: () => '/budaya' }));

describe('Navbar', () => {
  it('renders every navigation link', () => {
    render(<Navbar />);
    ['Beranda', 'Atraksi', 'Budaya', 'Kuliner', 'Penginapan', 'Kontak'].forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  it('shows the booking CTA', () => {
    render(<Navbar />);
    expect(screen.getAllByText(/Booking Sekarang/i).length).toBeGreaterThan(0);
  });

  it('marks the active route (Budaya) with an underline indicator', () => {
    const { container } = render(<Navbar />);
    // The active indicator is an absolutely-positioned span under the active link
    expect(container.querySelector('.bg-brand-600')).toBeTruthy();
  });
});
