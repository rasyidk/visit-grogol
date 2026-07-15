import { formatRupiah, formatDate, truncate, cn, youtubeEmbed, youtubeThumb, formatDateShort } from '@/lib/utils';

describe('formatRupiah', () => {
  it('formats an integer as IDR', () => {
    expect(formatRupiah(1250000).replace(/ /g, ' ')).toContain('Rp');
    expect(formatRupiah(1250000)).toMatch(/1\.250\.000/);
  });
  it('handles null', () => {
    expect(formatRupiah(null)).toMatch(/Rp/);
  });
});

describe('formatDate', () => {
  it('formats an ISO date in Indonesian', () => {
    expect(formatDate('2024-05-15')).toBe('15 Mei 2024');
  });
  it('returns dash for empty', () => {
    expect(formatDate(null)).toBe('-');
  });
});

describe('formatDateShort', () => {
  it('splits day and month', () => {
    const r = formatDateShort('2024-05-15');
    expect(r.day).toBe('15');
    expect(r.month).toBe('MEI');
  });
});

describe('truncate', () => {
  it('truncates long text', () => {
    expect(truncate('a'.repeat(200), 10)).toHaveLength(11); // 10 + ellipsis
  });
  it('keeps short text', () => {
    expect(truncate('short', 10)).toBe('short');
  });
});

describe('cn', () => {
  it('merges and dedupes tailwind classes', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-sm', false, 'font-bold')).toBe('text-sm font-bold');
  });
});

describe('youtube helpers', () => {
  it('builds an embed url', () => {
    expect(youtubeEmbed('https://www.youtube.com/watch?v=aqz-KE-bpKQ')).toBe(
      'https://www.youtube.com/embed/aqz-KE-bpKQ'
    );
  });
  it('extracts a thumbnail', () => {
    expect(youtubeThumb('https://youtu.be/aqz-KE-bpKQ')).toContain('aqz-KE-bpKQ');
  });
});
