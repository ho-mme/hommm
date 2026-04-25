import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { jsonToRecord } from '@/lib/json-utils';
import { sanitizeHtml } from '@/lib/sanitize';
import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';
import type { Metadata } from 'next';
import { SectionBg } from '@/components/SectionBg';
import { getSettings } from '@/lib/settings';
import { TopMenu } from '@/components/TopMenu';
import { getHomeContent } from '@/lib/content';
import { SubPageFooter } from '@/components/SubPageFooter';

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string[] }>;
};

const getPageBySlug = cache(async (slugSegments: string[]) => {
  const slug = slugSegments.join('/');

  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      sections: {
        where: { isVisible: true },
        orderBy: { order: 'asc' },
        include: {
          galleryImages: {
            orderBy: { order: 'asc' },
            select: { webpUrl: true, mobileUrl: true, altPl: true, altEn: true },
          },
        },
      },
      seo: true,
    },
  });

  return page;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || !page.isVisible) {
    return { title: 'Nie znaleziono' };
  }

  return {
    title: page.seo?.titlePl || page.title,
    description: page.seo?.descriptionPl || undefined,
    openGraph: page.seo?.ogImageUrl ? { images: [page.seo.ogImageUrl] } : undefined,
  };
}

export default async function SubPage({ params }: Props) {
  const { slug } = await params;
  const pageSlug = slug.join('/');
  const isRegulaminPage = pageSlug === 'regulamin';
  const [page, settings, homeSections] = await Promise.all([
    getPageBySlug(slug),
    getSettings(),
    getHomeContent(),
  ]);

  if (!page || !page.isVisible) {
    notFound();
  }

  const stopkaSection = homeSections.find((section) => section.slug === 'stopka');

  return (
    <main className="subpage-shell">
      {isRegulaminPage ? (
        <header className="subpage-logo-spacer" aria-label="HOMMM">
          <Link href="/" className="subpage-logo-link" aria-label="Przejdź na stronę główną">
            <span className="subpage-logo-mark" aria-hidden="true" />
          </Link>
        </header>
      ) : (
        <>
          <TopMenu activeView="home" hrefPrefix="/" />

          <section
            className="section h-100vh bg-slider relative"
            id="rezerwuj"
            data-menu-font="#ffffff"
            data-menu-logo="#ffffff"
          >
            <SectionBg src="/assets/hero.webp" objectPosition="center 70%" priority />
            <div className="hero-logo-stage relative z-10" aria-hidden="true">
              <img src="/assets/hommm.svg" alt="" className="hero-logo-main" />
            </div>
          </section>
        </>
      )}

      <section
        className="section subpage-content-section"
        data-menu-font="#be1622"
        data-menu-logo="#be1622"
      >
        <div className="container container-white subpage-content-container">
          {page.sections.map((section) => {
            const content = jsonToRecord(section.contentPl);
            return (
              <article
                key={section.id}
                className="subpage-content-block"
                style={{
                  backgroundColor: section.bgColor || undefined,
                  backgroundImage: section.bgImage ? `url(${section.bgImage})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {section.titlePl && (
                  <h2>{section.titlePl}</h2>
                )}

                {content.heading && (
                  <h3>{content.heading}</h3>
                )}

                {content.body && (
                  <div
                    className="subpage-rich-text"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.body) }}
                  />
                )}

                {section.galleryImages.length > 0 && (
                  <div className="subpage-gallery">
                    {section.galleryImages.map((img, i) => (
                      <Image
                        key={i}
                        src={img.mobileUrl || img.webpUrl}
                        alt={img.altPl || ''}
                        width={400}
                        height={300}
                        sizes="(max-width:768px) 50vw, 33vw"
                        className="subpage-gallery__image"
                      />
                    ))}
                  </div>
                )}
              </article>
            );
          })}

          {page.sections.length === 0 && (
            <p className="subpage-empty">Ta strona nie ma jeszcze treści.</p>
          )}
        </div>
      </section>

      <SubPageFooter settings={settings} stopkaSection={stopkaSection} />
    </main>
  );
}
