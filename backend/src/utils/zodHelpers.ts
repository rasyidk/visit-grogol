import { z } from 'zod';

/** Coerce "true"/"false"/"1"/"0"/boolean into a boolean (for form/query data). */
export const zBool = z.preprocess((v) => {
  if (typeof v === 'boolean') return v;
  if (v === 'true' || v === '1') return true;
  if (v === 'false' || v === '0') return false;
  return v;
}, z.boolean());

/** Coerce numeric strings into numbers. */
export const zInt = z.coerce.number().int();
export const zNumber = z.coerce.number();

/** Optional non-empty string that turns "" into undefined. */
export const zOptionalString = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v === '' ? undefined : v));

/** Nullable optional URL/path string. */
export const zOptionalUrl = z
  .string()
  .trim()
  .max(500)
  .optional()
  .or(z.literal(''))
  .transform((v) => (v ? v : undefined));

/** ISO date coerced to Date. */
export const zDate = z.coerce.date();

/** Wrap a body shape so `validate()` receives `{ body }`. */
export const bodySchema = <T extends z.ZodRawShape>(shape: T) => z.object({ body: z.object(shape) });
