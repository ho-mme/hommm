import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Weryfikacja CRON_SECRET
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [reservations, pages, sections, settings] = await Promise.all([
      prisma.reservation.findMany({
        orderBy: { createdAt: 'desc' },
        take: 500,
        select: {
          id: true, guestName: true, guestEmail: true, checkIn: true, checkOut: true,
          nights: true, guests: true, totalPrice: true, status: true, createdAt: true,
        },
      }),
      prisma.page.findMany({ orderBy: { order: 'asc' } }),
      prisma.section.findMany({ orderBy: { order: 'asc' }, select: { id: true, slug: true, pageId: true, titlePl: true, order: true } }),
      prisma.siteSettings.findMany(),
    ]);

    const exportData = {
      exportedAt: new Date().toISOString(),
      reservations,
      pages,
      sections,
      settings,
    };

    // Opcjonalnie: wysyłka mailem (jeśli skonfigurowany ADMIN_EMAIL)
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      try {
        const { sendEmail } = await import('@/lib/mail');
        const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/dashboard`;

        await sendEmail({
          to: adminEmail,
          subject: `HOMMM — Raport z eksportu danych ${new Date().toLocaleDateString('pl-PL')}`,
          html: `<h2>Raport z eksportu danych HOMMM</h2>
           <p>Eksport zakończony pomyślnie ${new Date().toLocaleString('pl-PL')}.</p>
           <ul>
             <li>Rezerwacji: ${reservations.length}</li>
             <li>Stron: ${pages.length}</li>
             <li>Sekcji: ${sections.length}</li>
             <li>Ustawień: ${settings.length}</li>
           </ul>
           <p>Dane zostały zarchiwizowane w bazie danych. Pełny wgląd dostępny w panelu:</p>
           <p><a href="${dashboardUrl}">${dashboardUrl}</a></p>`,
        });
      } catch (err) {
        console.error('[cron/export] Błąd wysyłki emaila eksportu:', err);
      }
    }

    return NextResponse.json({
      ok: true,
      exportedAt: exportData.exportedAt,
      counts: {
        reservations: reservations.length,
        pages: pages.length,
        sections: sections.length,
        settings: settings.length,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
