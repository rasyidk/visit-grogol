import { prisma } from '../../config/prisma';
import { createSingletonRouter } from '../../core/singletonRouter';
import { bodySchema, zOptionalString } from '../../utils/zodHelpers';
import { z } from 'zod';

const updateSchema = bodySchema({
  siteName: z.string().trim().min(1).max(140).optional(),
  siteNameEn: zOptionalString,
  tagline: zOptionalString,
  taglineEn: zOptionalString,
  logo: zOptionalString,
  favicon: zOptionalString,
  about: zOptionalString,
  aboutEn: zOptionalString,
  vision: zOptionalString,
  visionEn: zOptionalString,
  mission: zOptionalString,
  missionEn: zOptionalString,
  history: zOptionalString,
  historyEn: zOptionalString,
  heroImage: zOptionalString,
  atraksiHeroImage: zOptionalString,
  budayaHeroImage: zOptionalString,
  kulinerHeroImage: zOptionalString,
  penginapanHeroImage: zOptionalString,
  kontakHeroImage: zOptionalString,
});

export default createSingletonRouter(prisma.profilWebsite, 'Profil Website', updateSchema, {
  siteName: 'VisitGrogol',
  siteNameEn: zOptionalString,
});
