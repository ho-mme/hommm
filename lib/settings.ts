import { prisma } from './db';
import { z } from 'zod';
import { unstable_cache } from 'next/cache';

// --- Typy ---

export type SiteSettingsMap = {
  pricePerNight: number;
  priceWeekend: number;
  priceSeasonHigh: number;
  priceSeasonLow: number;
  seasonHighStart: string;
  seasonHighEnd: string;
  minNights: number;
  minNightsWeekend: number;
  longStayDiscount: number;
  longStayThreshold: number;
  maxGuests: number;
  contactEmail: string;
  contactPhone: string;
  socialInstagram: string;
  socialFacebook: string;
  socialTiktok: string;
  companyName: string;
  companyAddress: string;
  companyNip: string;
  depositPercent: number;
};

export const SETTINGS_DEFAULTS: SiteSettingsMap = {
  pricePerNight: 204.5,
  priceWeekend: 0,
  priceSeasonHigh: 0,
  priceSeasonLow: 0,
  seasonHighStart: '06-01',
  seasonHighEnd: '09-30',
  minNights: 2,
  minNightsWeekend: 2,
  longStayDiscount: 0,
  longStayThreshold: 7,
  maxGuests: 6,
  contactEmail: 'hommm@hommm.eu',
  contactPhone: '+48 608 259 945',
  socialInstagram: '',
  socialFacebook: '',
  socialTiktok: '',
  companyName: 'Banana Gun Design Maria Budner',
  companyAddress: 'ul. Sanocka 39 m 5, 93-038 Łódź',
  companyNip: '7292494164',
  depositPercent: 30,
};

// --- Walidacja ---

export const settingsSchema = z.object({
  pricePerNight: z.number().min(0, 'Cena musi być >= 0'),
  priceWeekend: z.number().min(0),
  priceSeasonHigh: z.number().min(0),
  priceSeasonLow: z.number().min(0),
  seasonHighStart: z.string().regex(/^\d{2}-\d{2}$/, 'Format MM-DD'),
  seasonHighEnd: z.string().regex(/^\d{2}-\d{2}$/, 'Format MM-DD'),
  minNights: z.number().int().min(1).max(30),
  minNightsWeekend: z.number().int().min(1).max(30),
  longStayDiscount: z.number().min(0).max(100),
  longStayThreshold: z.number().int().min(1).max(365),
  maxGuests: z.number().int().min(1).max(50),
  contactEmail: z.string().email('Nieprawidłowy email'),
  contactPhone: z.string().min(1, 'Telefon jest wymagany'),
  socialInstagram: z.string().max(500).optional().default(''),
  socialFacebook: z.string().max(500).optional().default(''),
  socialTiktok: z.string().max(500).optional().default(''),
  companyName: z.string().max(200).optional().default(''),
  companyAddress: z.string().max(500).optional().default(''),
  companyNip: z.string().max(20).optional().default(''),
  depositPercent: z.number().min(0).max(100),
});

// --- Logic ---

async function _getSettingsFromDb(): Promise<SiteSettingsMap> {
  const rows = await prisma.siteSettings.findMany();
  const map: Record<string, unknown> = {};

  for (const row of rows) {
    map[row.key] = row.value;
  }

  const merged = { ...SETTINGS_DEFAULTS, ...map };
  const parsed = settingsSchema.safeParse(merged);
  return parsed.success ? parsed.data : SETTINGS_DEFAULTS;
}

export const getSettings = unstable_cache(
  _getSettingsFromDb,
  ['site-settings'],
  { revalidate: 300, tags: ['settings'] },
);
