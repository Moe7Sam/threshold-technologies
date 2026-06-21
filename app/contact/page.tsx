import PageHero from '@/components/PageHero';
import Card from '@/components/Card';
import { contactOptions } from '@/lib/content';

export const metadata = { title: 'Contact | Threshold Technologies', description: 'Start Conversation.' };

export default function Page() {
  return (
    <main>
      <PageHero eyebrow="Contact" title="Contact" lead="Start Conversation" />
      <section className="page-section">
        <div className="nav-grid five">
          {contactOptions.map((option) => <Card key={option} title={option} copy="Contact" cta="Start" />)}
        </div>
        <div className="contact-panel">
          <p className="kicker">Threshold Technologies FZE LLC</p>
          <h2>United Arab Emirates</h2>
          <p>Consulting. DiSam. Academy.</p>
        </div>
      </section>
    </main>
  );
}
