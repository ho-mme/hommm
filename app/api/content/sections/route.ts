import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sections = await prisma.section.findMany({
      orderBy: [{ page: { order: 'asc' } }, { order: 'asc' }],
      select: {
        slug: true,
        titlePl: true,
        page: { select: { slug: true, title: true, isHome: true } },
      },
    });

    return NextResponse.json(
      sections.map((section) => ({
        slug: section.page.isHome ? section.slug : section.page.slug,
        titlePl: section.page.isHome
          ? section.titlePl
          : section.titlePl || section.page.title,
      })),
    );
  } catch {
    return NextResponse.json([]);
  }
}
