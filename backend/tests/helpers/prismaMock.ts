import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import type { PrismaClient } from '@prisma/client';

/**
 * Registers a deep mock for the shared Prisma client. Import this file FIRST
 * in a test (before importing the app/services) so the mock is in place.
 *
 *   import { prismaMock } from '../helpers/prismaMock';
 *   import { createApp } from '@/app';
 */
jest.mock('@/config/prisma', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { mockDeep: deep } = require('jest-mock-extended');
  const client = deep();
  return { __esModule: true, prisma: client, default: client };
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const prismaMock = require('@/config/prisma').prisma as DeepMockProxy<PrismaClient>;
