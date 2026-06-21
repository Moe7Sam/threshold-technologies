export default function SectionHeading({ index, label, title, copy }: { index: string; label: string; title: string; copy?: string }) {
  return <div className="section-heading">
    <div><p className="kicker">{index} / {label}</p><h2>{title}</h2></div>
    {copy && <p>{copy}</p>}
  </div>;
}
