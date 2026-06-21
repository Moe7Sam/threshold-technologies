import PageHero from '@/components/PageHero';
import Card from '@/components/Card';
import { aboutItems } from '@/lib/content';

export const metadata = { title: 'About | Threshold Technologies', description: 'Threshold Technologies.' };

export default function Page() {
  return (
    <main>
      <PageHero eyebrow="About Threshold" title="About Threshold" lead="Threshold Technologies" />
      <section className="page-section">
        <div className="nav-grid four">
          {aboutItems.map((item) => <Card key={item.name} title={item.name} copy={item.line} cta="Profile" />)}
        </div>
      </section>
    </main>
  );
}
