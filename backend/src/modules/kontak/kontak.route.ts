import { prisma } from '../../config/prisma';
import { createSingletonRouter } from '../../core/singletonRouter';
import { bodySchema, zNumber, zOptionalString } from '../../utils/zodHelpers';

const updateSchema = bodySchema({
  address: zOptionalString,
  phone: zOptionalString,
  whatsapp: zOptionalString,
  email: zOptionalString,
  mapEmbed: zOptionalString,
  latitude: zNumber.optional(),
  longitude: zNumber.optional(),
  facebook: zOptionalString,
  instagram: zOptionalString,
  twitter: zOptionalString,
  youtube: zOptionalString,
});

export default createSingletonRouter(prisma.kontak, 'Kontak', updateSchema, {});
