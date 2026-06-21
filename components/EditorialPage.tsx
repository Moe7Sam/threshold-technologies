import Gateway from './Gateway';

export default function EditorialPage({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children: React.ReactNode }) {
  return <main>
    <header className="editorial-hero"><div><p className="kicker">{eyebrow}</p><h1>{title}</h1><p>{lead}</p></div><Gateway compact /></header>
    <div className="editorial-body">{children}</div>
  </main>;
}
