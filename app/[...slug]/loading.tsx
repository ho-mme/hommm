import Link from 'next/link';

export default function SubPageLoading() {
  return (
    <main className="subpage-shell">
      <header className="subpage-logo-spacer" aria-label="HOMMM">
        <Link href="/" className="subpage-logo-link" aria-label="Przejdź na stronę główną">
          <span className="subpage-logo-mark" aria-hidden="true" />
        </Link>
      </header>
    </main>
  );
}
