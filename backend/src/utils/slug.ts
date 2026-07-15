import slugify from 'slugify';

export function toSlug(input: string): string {
  return slugify(input, { lower: true, strict: true, trim: true });
}

/**
 * Generate a slug that is unique for a given model by appending a
 * numeric suffix when a collision is found.
 *
 * @param base       raw text to slugify
 * @param exists     async predicate returning true if the slug is taken
 */
export async function uniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>
): Promise<string> {
  const root = toSlug(base) || 'item';
  let candidate = root;
  let n = 1;
  // eslint-disable-next-line no-await-in-loop
  while (await exists(candidate)) {
    candidate = `${root}-${n}`;
    n += 1;
  }
  return candidate;
}
