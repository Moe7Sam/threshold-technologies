import Link from 'next/link';

export default function Card({ href, label, title, copy, cta = 'Open' }: { href?: string; label?: string; title: string; copy: string; cta?: string }) {
  const content = (
    <>
      {label && <span>{label}</span>}
      <h3>{title}</h3>
      <p>{copy}</p>
      <b>{cta}</b>
    </>
  );

  if (href) {
    return <Link href={href} className="nav-card">{content}</Link>;
  }

  return <article className="nav-card">{content}</article>;
}
