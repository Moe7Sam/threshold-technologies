import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Card from '@/components/Card';
import { disamProducts } from '@/lib/content';

export const metadata = { title: 'DiSam | Threshold Technologies', description: 'Digital Intelligence.' };

export default function Page() {
  return (
    <main>
      <PageHero eyebrow="DiSam" title="DiSam" lead="Digital Intelligence" />
      <section className="page-section">
        <div className="nav-grid four">
          {disamProducts.map((product) => <Card key={product.name} title={product.name} copy={product.label} cta="System" />)}
        </div>
        <Link href="/contact" className="text-link">Request Demo</Link>
      </section>
    </main>
  );
}
