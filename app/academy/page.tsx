import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Card from '@/components/Card';
import { academyTracks } from '@/lib/content';

export const metadata = { title: 'Academy | Threshold Technologies', description: 'Future Skills.' };

export default function Page() {
  return (
    <main>
      <PageHero eyebrow="Academy" title="Academy" lead="Future Skills" />
      <section className="page-section">
        <div className="nav-grid three">
          {academyTracks.map((track) => <Card key={track} title={track} copy="Applied Knowledge" cta="Track" />)}
        </div>
        <Link href="/contact" className="text-link">Join Academy</Link>
      </section>
    </main>
  );
}
