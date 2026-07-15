import { prisma } from '../../config/prisma';
import { createSingletonRouter } from '../../core/singletonRouter';
import { bodySchema, zOptionalString } from '../../utils/zodHelpers';
import { z } from 'zod';

const updateSchema = bodySchema({
  siteName: z.string().trim().min(1).max(140).optional(),
  tagline: zOptionalString,
  logo: zOptionalString,
  favicon: zOptionalString,
  about: zOptionalString,
  vision: zOptionalString,
  mission: zOptionalString,
  history: zOptionalString,
  heroImage: zOptionalString,
});

export default createSingletonRouter(prisma.profilWebsite, 'Profil Website', updateSchema, {
  siteName: 'VisitGrogol',
});
