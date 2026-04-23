'use server';

import { prisma } from '@/lib/db';
import { verifySession, unauthorized } from '@/lib/auth';
import { z } from 'zod';
import { extractZodError } from '@/lib/validations';
import { revalidateTag } from 'next/cache';
import { getSettings, type SiteSettingsMap, settingsSchema } from '@/lib/settings';

export async function updateSettings(data: Partial<SiteSettingsMap>) {
  const session = await verifySession();
  if (!session) return unauthorized();

  // Pobierz aktualne i scal
  const current = await getSettings();
  const merged = { ...current, ...data };

  const parsed = settingsSchema.safeParse(merged);
  if (!parsed.success) return { error: extractZodError(parsed.error) };

  // Upsert każdy klucz
  const entries = Object.entries(parsed.data) as [string, unknown][];
  await prisma.$transaction(
    entries.map(([key, value]) =>
      prisma.siteSettings.upsert({
        where: { key },
        update: { value: value as object },
        create: { key, value: value as object },
      })
    )
  );

  revalidateTag('settings');
  return { success: true };
}

// --- Admin whitelist ---

export async function getAdminWhitelist() {
  const session = await verifySession();
  if (!session) return [];

  return prisma.admin.findMany({
    select: { id: true, email: true, name: true, isActive: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });
}

export async function addAdmin(email: string, name?: string) {
  const session = await verifySession();
  if (!session) return unauthorized();

  const emailSchema = z.string().email();
  if (!emailSchema.safeParse(email).success) return { error: 'Nieprawidłowy email' };

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) return { error: 'Admin o tym emailu już istnieje' };

  const admin = await prisma.admin.create({
    data: { email, name: name || null },
  });

  return { success: true, admin };
}

export async function removeAdmin(id: string) {
  const session = await verifySession();
  if (!session) return unauthorized();

  // Nie pozwól usunąć samego siebie
  if (session.admin.id === id) return { error: 'Nie można usunąć samego siebie' };

  // Nie pozwól usunąć ostatniego admina
  const count = await prisma.admin.count({ where: { isActive: true } });
  if (count <= 1) return { error: 'Musi być przynajmniej jeden admin' };

  await prisma.admin.delete({ where: { id } });
  return { success: true };
}
