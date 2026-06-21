import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Card from '@/components/Card';
import { consultingServices } from '@/lib/content';

export const metadata = { title: 'Consulting | Threshold Technologies', description: 'Commercial Excellence.' };

export default function Page() {
  return (
    <main>
      <PageHero eyebrow="Consulting" title="Consulting" lead="Commercial Excellence" />
      <section className="page-section">
        <div className="nav-grid three">
          {consultingServices.map((service) => <Card key={service} title={service} copy="Consulting" cta="Service" />)}
        </div>
        <Link href="/contact" className="text-link">Start Conversation</Link>
      </section>
    </main>
  );
}
