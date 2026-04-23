import { prisma } from './db';

/** Pobiera aktywne reguły cenowe (dla calculatePrice — bez auth) */
export async function getActivePricingRules() {
  const rules = await prisma.pricingRule.findMany({
    where: { isActive: true },
    select: { dateFrom: true, dateTo: true, pricePerNight: true },
    orderBy: { dateFrom: 'asc' },
  });
  return rules;
}
