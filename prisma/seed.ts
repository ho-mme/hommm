import 'dotenv/config';
import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { getSeedAdminEmail } from '../lib/env';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = getSeedAdminEmail();
  const regulaminBodyPl = `
<p>Niniejszy regulamin określa zasady dokonywania rezerwacji, korzystania z obiektu HOMMM oraz komunikacji pomiędzy Gościem a właścicielem obiektu. Dokument porządkuje najważniejsze informacje organizacyjne, tak aby pobyt przebiegał spokojnie, jasno i bez niepotrzebnych nieporozumień.</p>

<h2>1. Postanowienia ogólne</h2>
<p>Regulamin obowiązuje wszystkie osoby przebywające na terenie obiektu HOMMM. Dokonanie rezerwacji oznacza zapoznanie się z regulaminem oraz akceptację jego postanowień. Osoba dokonująca rezerwacji odpowiada za przekazanie zasad pozostałym uczestnikom pobytu.</p>
<p>Obiekt przeznaczony jest do krótkoterminowego wypoczynku. Nie jest miejscem organizacji imprez masowych, wydarzeń komercyjnych ani spotkań wykraczających poza uzgodnioną liczbę Gości, chyba że właściciel wyrazi na to wcześniejszą, pisemną zgodę.</p>

<h2>2. Rezerwacja pobytu</h2>
<p>Rezerwacji można dokonać przez formularz dostępny na stronie internetowej, drogą mailową albo telefonicznie. Samo wysłanie zapytania lub formularza nie oznacza jeszcze zawarcia rezerwacji. Rezerwacja staje się wiążąca po potwierdzeniu terminu przez HOMMM oraz spełnieniu ustalonych warunków płatności.</p>
<p>W potwierdzeniu rezerwacji wskazywane są w szczególności: termin pobytu, liczba Gości, cena, ewentualny zadatek lub zaliczka, dane do płatności, godziny przyjazdu i wyjazdu oraz inne ustalenia indywidualne. Gość powinien sprawdzić poprawność danych i niezwłocznie zgłosić ewentualne błędy.</p>

<h2>3. Płatności</h2>
<p>Warunki płatności są przekazywane przed ostatecznym potwierdzeniem pobytu. HOMMM może wymagać zadatku, zaliczki albo pełnej płatności z góry, zależnie od terminu, długości pobytu i ustaleń indywidualnych.</p>
<p>Brak płatności w uzgodnionym terminie może skutkować anulowaniem rezerwacji. W przypadku płatności przelewem za datę płatności uznaje się datę zaksięgowania środków na rachunku wskazanym przez HOMMM, chyba że strony ustalą inaczej.</p>

<h2>4. Zmiana lub anulowanie rezerwacji</h2>
<p>Prośby o zmianę terminu pobytu rozpatrywane są indywidualnie i zależą od aktualnej dostępności obiektu. Zmiana rezerwacji może wiązać się ze zmianą ceny, minimalnej długości pobytu lub innych warunków organizacyjnych.</p>
<p>Zasady anulowania rezerwacji, w tym możliwość zwrotu zadatku lub zaliczki, są określane w potwierdzeniu rezerwacji. Jeżeli nie ustalono inaczej, anulowanie pobytu w krótkim terminie przed przyjazdem może oznaczać brak zwrotu wpłaconych środków.</p>

<h2>5. Zameldowanie i wymeldowanie</h2>
<p>Godziny zameldowania i wymeldowania są potwierdzane przed przyjazdem. Przyjazd poza ustalonym przedziałem godzin wymaga wcześniejszego kontaktu i potwierdzenia przez HOMMM.</p>
<p>Gość zobowiązany jest opuścić obiekt w dniu wyjazdu w ustalonej godzinie, pozostawiając go w stanie uporządkowanym. Przedłużenie pobytu jest możliwe wyłącznie po wcześniejszym uzgodnieniu i potwierdzeniu dostępności.</p>

<h2>6. Liczba Gości</h2>
<p>W obiekcie mogą przebywać wyłącznie osoby zgłoszone w rezerwacji. Zwiększenie liczby Gości wymaga wcześniejszej zgody HOMMM. Właściciel może odmówić przyjęcia dodatkowych osób, jeżeli przekraczałoby to komfort, bezpieczeństwo lub ustalony limit pobytu.</p>
<p>Osoby odwiedzające, które nie są objęte rezerwacją, mogą przebywać na terenie obiektu wyłącznie po wcześniejszym uzgodnieniu. Gość dokonujący rezerwacji ponosi odpowiedzialność za zachowanie wszystkich osób przebywających z nim w obiekcie.</p>

<h2>7. Zasady korzystania z obiektu</h2>
<p>Goście zobowiązani są korzystać z obiektu, wyposażenia i otoczenia zgodnie z przeznaczeniem. Należy dbać o porządek, zamykać drzwi i okna przy opuszczaniu obiektu, korzystać rozsądnie z mediów oraz zgłaszać zauważone usterki niezwłocznie po ich wykryciu.</p>
<p>Zabrania się wynoszenia wyposażenia poza teren obiektu, przestawiania elementów technicznych, ingerowania w instalacje oraz podejmowania działań, które mogłyby spowodować uszkodzenie mienia, zagrożenie pożarowe lub utrudnienie korzystania z przestrzeni kolejnym Gościom.</p>

<h2>8. Cisza, spokój i otoczenie</h2>
<p>HOMMM jest miejscem wypoczynku w otoczeniu natury. Goście proszeni są o poszanowanie ciszy, krajobrazu, sąsiedztwa i charakteru miejsca. Głośna muzyka, hałaśliwe zachowanie oraz działania zakłócające odpoczynek innych osób są niedozwolone.</p>
<p>Na terenie obiektu i w jego otoczeniu należy zachować szczególną ostrożność wobec roślinności, elementów małej architektury i naturalnego ukształtowania terenu. Odpady należy pozostawiać wyłącznie w miejscach do tego przeznaczonych.</p>

<h2>9. Bezpieczeństwo</h2>
<p>Goście korzystają z obiektu i jego otoczenia z należytą ostrożnością. Szczególną uwagę należy zachować podczas korzystania ze schodów, tarasów, elementów zewnętrznych, urządzeń grzewczych, instalacji elektrycznej oraz wszelkich stref, które ze względu na warunki pogodowe mogą być śliskie lub mokre.</p>
<p>Dzieci mogą przebywać na terenie obiektu wyłącznie pod opieką osób dorosłych. Opiekunowie ponoszą odpowiedzialność za bezpieczeństwo dzieci oraz szkody powstałe w wyniku ich działania.</p>

<h2>10. Szkody i odpowiedzialność</h2>
<p>Gość ponosi odpowiedzialność za szkody wyrządzone w obiekcie, wyposażeniu, elementach zewnętrznych lub otoczeniu przez siebie, osoby współtowarzyszące oraz osoby odwiedzające. O każdej szkodzie należy poinformować HOMMM niezwłocznie, najlepiej jeszcze w trakcie pobytu.</p>
<p>W przypadku stwierdzenia szkód po wyjeździe HOMMM może skontaktować się z Gościem w celu wyjaśnienia sytuacji i ustalenia sposobu naprawienia szkody. Koszt naprawy, wymiany lub dodatkowego sprzątania może zostać rozliczony z Gościem.</p>

<h2>11. Rzeczy osobiste</h2>
<p>Goście są odpowiedzialni za swoje rzeczy osobiste pozostawione w obiekcie, samochodzie i na terenie zewnętrznym. HOMMM nie ponosi odpowiedzialności za utratę lub uszkodzenie rzeczy wynikające z niedochowania należytej staranności przez Gościa.</p>
<p>Rzeczy pozostawione po wyjeździe mogą zostać odesłane na koszt Gościa po wcześniejszym kontakcie. Jeżeli kontakt nie będzie możliwy, HOMMM przechowa znalezione przedmioty przez rozsądny czas, zależnie od ich rodzaju i wartości.</p>

<h2>12. Zwierzęta</h2>
<p>Pobyt ze zwierzętami jest możliwy wyłącznie po wcześniejszym uzgodnieniu i potwierdzeniu przez HOMMM. Gość odpowiada za zachowanie zwierzęcia, czystość, ewentualne szkody oraz komfort pozostałych osób korzystających z przestrzeni.</p>

<h2>13. Zakazy</h2>
<p>Na terenie obiektu zabronione jest palenie tytoniu i używanie otwartego ognia w miejscach do tego nieprzeznaczonych, organizowanie imprez bez zgody właściciela, udostępnianie obiektu osobom trzecim, prowadzenie działalności komercyjnej bez zgody HOMMM oraz korzystanie z obiektu w sposób sprzeczny z prawem lub dobrymi obyczajami.</p>

<h2>14. Reklamacje i kontakt w trakcie pobytu</h2>
<p>Wszelkie uwagi dotyczące pobytu, usterek lub niezgodności należy zgłaszać niezwłocznie, aby HOMMM mogło zareagować w trakcie pobytu. Zgłoszenia dokonane dopiero po wyjeździe mogą być trudniejsze do zweryfikowania.</p>
<p>Kontakt w sprawach organizacyjnych odbywa się mailowo lub telefonicznie. Aktualne dane kontaktowe są dostępne na stronie internetowej oraz w potwierdzeniu rezerwacji.</p>

<h2>15. Dane osobowe</h2>
<p>Dane osobowe przekazywane przy rezerwacji są przetwarzane w celu obsługi zapytania, realizacji rezerwacji, kontaktu z Gościem oraz wykonania obowiązków wynikających z przepisów prawa. Dane są przetwarzane zgodnie z obowiązującymi przepisami dotyczącymi ochrony danych osobowych.</p>

<h2>16. Postanowienia końcowe</h2>
<p>HOMMM zastrzega sobie prawo do aktualizacji regulaminu. Do rezerwacji stosuje się regulamin obowiązujący w dniu jej potwierdzenia, chyba że zmiany wynikają z przepisów prawa lub są korzystne dla Gościa.</p>
<p>W sprawach nieuregulowanych regulaminem zastosowanie mają indywidualne ustalenia stron oraz powszechnie obowiązujące przepisy prawa. W razie pytań dotyczących regulaminu prosimy o kontakt: hommm@hommm.eu.</p>
`.trim();

  const regulaminBodyEn = `
<p>These terms define the basic rules for booking and staying at HOMMM. The content is informational and may be refined by the site administrator in the CMS panel.</p>

<h2>Booking</h2>
<p>A stay is booked by submitting the reservation form or contacting HOMMM directly. The dates, price and stay conditions are confirmed by email or phone.</p>

<h2>Stay</h2>
<p>Guests are expected to use the property as intended, respecting the equipment, surroundings and comfort of others. Exact check-in and check-out times are confirmed during booking.</p>

<h2>Payments and cancellations</h2>
<p>Payment, deposit and cancellation conditions are agreed individually and shared before the final stay confirmation.</p>

<h2>Contact</h2>
<p>For questions about these terms, booking or stay details, please contact us at hommm@hommm.eu.</p>
`.trim();

  // Create admin
  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      isActive: true,
    },
  });

  console.log('Admin created:', admin.email);

  // Create home page
  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'Strona główna',
      isHome: true,
      isVisible: true,
      order: 0,
    },
  });

  console.log('Home page created:', homePage.slug);

  const termsPage = await prisma.page.upsert({
    where: { slug: 'regulamin' },
    update: {
      title: 'Regulamin',
      isVisible: true,
      order: 1,
    },
    create: {
      slug: 'regulamin',
      title: 'Regulamin',
      isHome: false,
      isVisible: true,
      order: 1,
    },
  });

  await prisma.section.upsert({
    where: { pageId_slug: { pageId: termsPage.id, slug: 'regulamin' } },
    update: {
      order: 0,
      isVisible: true,
      titlePl: null,
      titleEn: null,
      contentPl: { body: regulaminBodyPl },
      contentEn: { body: regulaminBodyEn },
    },
    create: {
      pageId: termsPage.id,
      slug: 'regulamin',
      order: 0,
      isVisible: true,
      titlePl: null,
      titleEn: null,
      contentPl: { body: regulaminBodyPl },
      contentEn: { body: regulaminBodyEn },
    },
  });

  await prisma.section.deleteMany({
    where: { pageId: termsPage.id, slug: 'tresc' },
  });

  await prisma.seoSettings.upsert({
    where: { pageId: termsPage.id },
    update: {
      titlePl: 'Regulamin | HOMMM',
      titleEn: 'Terms | HOMMM',
      descriptionPl: 'Regulamin rezerwacji i pobytu w HOMMM.',
      descriptionEn: 'Booking and stay terms for HOMMM.',
    },
    create: {
      pageId: termsPage.id,
      titlePl: 'Regulamin | HOMMM',
      titleEn: 'Terms | HOMMM',
      descriptionPl: 'Regulamin rezerwacji i pobytu w HOMMM.',
      descriptionEn: 'Booking and stay terms for HOMMM.',
    },
  });

  console.log('Terms page created:', termsPage.slug);

  // Create sections for home page
  const sections = [
    {
      slug: 'hero',
      order: 0,
      titlePl: 'Hero',
      titleEn: 'Hero',
      contentPl: { heading: 'YOUR SPECIAL TIME', subheading: 'HOMMM' },
      contentEn: { heading: 'YOUR SPECIAL TIME', subheading: 'HOMMM' },
    },
    {
      slug: 'koncept',
      order: 1,
      titlePl: 'Koncept HOMMM',
      titleEn: 'HOMMM Concept',
      contentPl: {
        heading: 'YOUR SPECIAL TIME',
        subheading: 'KONCEPT HOMMM',
        body: 'To przykładowy blok treści, który opisuje charakter miejsca i spokojny rytm wypoczynku.',
      },
      contentEn: {
        heading: 'YOUR SPECIAL TIME',
        subheading: 'HOMMM CONCEPT',
        body: 'This is a sample content block that describes the character of the place and the calm rhythm of rest.',
      },
    },
    {
      slug: 'miejsce',
      order: 2,
      titlePl: 'Miejsce',
      titleEn: 'Place',
      contentPl: {
        heading: 'YOUR SPECIAL PLACE',
        subheading: 'CHCESZ WYPOCZĄĆ W CISZY I OTOCZENIU NATURY?',
        body: 'To przykładowy tekst do sekcji miejsca — podkreśla kameralność, naturę i oddech od codziennego tempa.',
      },
      contentEn: {
        heading: 'YOUR SPECIAL PLACE',
        subheading: 'WANT TO REST IN SILENCE AND SURROUNDED BY NATURE?',
        body: 'This is a sample text for the place section — emphasizing intimacy, nature and a break from everyday pace.',
      },
    },
    {
      slug: 'rezerwacja',
      order: 3,
      titlePl: 'Rezerwacja',
      titleEn: 'Reservation',
      contentPl: {
        title: 'Zarezerwuj swój czas',
        description: 'Wybierz daty i poczuj spokój Hommm. Nasz kalendarz pokazuje aktualną dostępność apartamentów i pozwala szybko sprawdzić najlepszy termin pobytu.',
        description2: 'Zaplanuj pobyt w miejscu, gdzie natura spotyka się z komfortem, a galeria od razu pokazuje rytm przestrzeni i najważniejsze detale.',
        checkin: 'Zameldowanie',
        checkout: 'Wymeldowanie',
        guests_label: 'Goście',
        submit: 'REZERWUJ',
        note: 'Płatność nie zostanie jeszcze naliczona',
        clear: 'Wyczyść daty',
        info: 'Rezerwacja zostanie potwierdzona w ciągu 24h od złożenia.',
        night_one: 'noc',
        night_few: 'noce',
        night_many: 'nocy',
        guest_one: 'gość',
        guest_few: 'gości',
      },
      contentEn: {
        title: 'Book your time',
        description: 'Choose your dates and feel the peace of Hommm. Our calendar shows current availability and allows you to quickly find the best dates for your stay.',
        description2: 'Plan your stay in a place where nature meets comfort, and the gallery instantly shows the rhythm of the space and its most important details.',
        checkin: 'Check-in',
        checkout: 'Check-out',
        guests_label: 'Guests',
        submit: 'BOOK NOW',
        note: "You won't be charged yet",
        clear: 'Clear dates',
        info: 'Your reservation will be confirmed within 24 hours.',
        night_one: 'night',
        night_few: 'nights',
        night_many: 'nights',
        guest_one: 'guest',
        guest_few: 'guests',
      },
    },
    {
      slug: 'menu',
      order: 6,
      titlePl: 'Menu nawigacyjne',
      titleEn: 'Navigation menu',
      contentPl: {
        koncept_label: 'KONCEPT',
        miejsca_label: 'MIEJSCA',
        rezerwuj_label: 'REZERWUJ',
      },
      contentEn: {
        koncept_label: 'CONCEPT',
        miejsca_label: 'PLACES',
        rezerwuj_label: 'BOOK',
      },
    },
    {
      slug: 'stopka',
      order: 5,
      titlePl: 'Stopka',
      titleEn: 'Footer',
      contentPl: {
        koncept_label: 'KONCEPT',
        miejsca_label: 'MIEJSCA',
        rezerwuj_label: 'REZERWUJ',
        corporate_title: 'DANE KORPORACYJNE:',
        contact_title: 'KONTAKT:',
        email: 'hommm@hommm.eu',
        phone: '+48 608 259 945',
        company: 'Banana Gun Design Maria Budner',
        address: 'ul. Sanocka 39 m 5, 93-038 Łódź',
        nip: '7292494164',
      },
      contentEn: {
        koncept_label: 'CONCEPT',
        miejsca_label: 'PLACES',
        rezerwuj_label: 'BOOK',
        corporate_title: 'CORPORATE:',
        contact_title: 'CONTACT:',
        email: 'hommm@hommm.eu',
        phone: '+48 608 259 945',
        company: 'Banana Gun Design Maria Budner',
        address: 'ul. Sanocka 39 m 5, 93-038 Łódź',
        nip: '7292494164',
      },
    },
  ];

  for (const section of sections) {
    await prisma.section.upsert({
      where: { pageId_slug: { pageId: homePage.id, slug: section.slug } },
      update: { order: section.order },
      create: {
        pageId: homePage.id,
        ...section,
      },
    });
    console.log('Section created:', section.slug);
  }

  // Create default site settings
  const defaultSettings = [
    { key: 'site_name', value: { pl: 'HOMMM', en: 'HOMMM' } },
    { key: 'price_per_night', value: { amount: 204.5, currency: 'PLN' } },
    { key: 'max_guests', value: { count: 6 } },
    { key: 'contact_email', value: { email: 'hommm@hommm.eu' } },
    { key: 'contact_phone', value: { phone: '+48 608 259 945' } },
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
    console.log('Setting created:', setting.key);
  }

  console.log('\nSeed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
