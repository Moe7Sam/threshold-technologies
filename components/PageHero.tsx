import Gateway from './Gateway';

export default function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <header className="page-hero">
      <div>
        <p className="kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
      <Gateway compact />
    </header>
  );
}
