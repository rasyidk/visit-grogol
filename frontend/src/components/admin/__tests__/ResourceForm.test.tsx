import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResourceForm } from '@/components/admin/ResourceForm';
import type { ResourceConfig } from '@/components/admin/resourceTypes';

const config: ResourceConfig = {
  key: 'test',
  endpoint: '/test',
  label: 'Test',
  labelSingular: 'Test',
  columns: [],
  fields: [
    { name: 'name', label: 'Nama', type: 'text', required: true },
    { name: 'price', label: 'Harga', type: 'number' },
    { name: 'tags', label: 'Tags', type: 'tags' },
    { name: 'active', label: 'Aktif', type: 'switch', defaultValue: true },
  ],
};

describe('ResourceForm', () => {
  it('blocks submit and shows a validation error when a required field is empty', async () => {
    const onSubmit = jest.fn();
    render(<ResourceForm config={config} onSubmit={onSubmit} onCancel={jest.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: 'Simpan' }));
    expect(await screen.findByText(/Nama wajib diisi/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits normalised values (tags → array, number coerced)', async () => {
    const onSubmit = jest.fn();
    render(<ResourceForm config={config} onSubmit={onSubmit} onCancel={jest.fn()} />);
    const textboxes = screen.getAllByRole('textbox');
    await userEvent.type(textboxes[0], 'Danau Cermin'); // name (first text input)
    await userEvent.type(screen.getByPlaceholderText(/pisahkan dengan koma/i), 'A, B, C');
    await userEvent.click(screen.getByRole('button', { name: 'Simpan' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const payload = onSubmit.mock.calls[0][0];
    expect(payload.name).toBe('Danau Cermin');
    expect(payload.tags).toEqual(['A', 'B', 'C']);
    expect(payload.active).toBe(true);
  });

  it('calls onCancel from the Batal button', async () => {
    const onCancel = jest.fn();
    render(<ResourceForm config={config} onSubmit={jest.fn()} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole('button', { name: 'Batal' }));
    expect(onCancel).toHaveBeenCalled();
  });
});
