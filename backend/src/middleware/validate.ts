import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

type Schema = AnyZodObject | ZodEffects<AnyZodObject>;

/**
 * Validate and coerce req.body / req.query / req.params against a Zod schema.
 * The schema shape is `{ body?, query?, params? }`. Parsed values replace
 * the originals so downstream handlers get typed, sanitized data.
 */
export const validate =
  (schema: Schema) => (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    }) as { body?: unknown; query?: unknown; params?: unknown };

    if (parsed.body !== undefined) req.body = parsed.body;
    if (parsed.query !== undefined) Object.assign(req.query, parsed.query);
    if (parsed.params !== undefined) Object.assign(req.params, parsed.params);
    next();
  };
