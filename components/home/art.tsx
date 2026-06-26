/* Generative wireframe line-art for the homepage. Decorative — aria-hidden.
   Faint structure uses --hairline; the single accent path uses [data-stroke]
   (resolved to --red-line in CSS), tying each drawing back to the motif. */

const mono = 'var(--font-mono)';

export function VisionFlow() {
  const nodes = [
    { x: 110, label: 'DATA' },
    { x: 380, label: 'MODEL' },
    { x: 650, label: 'COMMERCIAL' },
    { x: 905, label: 'INTELLIGENCE' },
  ];
  return (
    <svg viewBox="0 0 1000 200" role="img" aria-label="System connection: Data to Model to Commercial to Intelligence" preserveAspectRatio="xMidYMid meet">
      {/* baseline the nodes cross */}
      <line x1="40" y1="90" x2="960" y2="90" stroke="var(--hairline)" strokeWidth="1" />
      {/* red data-flow accent */}
      <line x1="40" y1="90" x2="960" y2="90" stroke="var(--red-line)" strokeWidth="1.5" strokeDasharray="3 10" opacity="0.85" />
      {/* threshold vertical line */}
      <line x1="515" y1="30" x2="515" y2="150" stroke="var(--red-line)" strokeWidth="1" opacity="0.5" />
      {nodes.map((n, i) => (
        <g key={n.label}>
          <line x1={n.x} y1="68" x2={n.x} y2="112" stroke="var(--hairline)" strokeWidth="1" />
          <rect x={n.x - 7} y="83" width="14" height="14" fill="var(--bg)" stroke="var(--red-line)" strokeWidth="1.5" />
          <text x={n.x} y="138" textAnchor="middle" fill="var(--text-muted)" fontFamily={mono} fontSize="13" letterSpacing="1">{n.label}</text>
          <text x={n.x} y="62" textAnchor="middle" fill="var(--text-faint)" fontFamily={mono} fontSize="11">{`0${i + 1}`}</text>
        </g>
      ))}
    </svg>
  );
}

const F = { stroke: 'var(--hairline)', strokeWidth: 1, fill: 'none' } as const;

export function ArtDiSam() {
  return (
    <svg viewBox="0 0 200 100" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {/* stacked isometric BIM layers reducing to a structured base */}
      <path {...F} d="M40 64 L100 44 L160 64 L100 84 Z" />
      <path {...F} d="M40 50 L100 30 L160 50 L100 70 Z" />
      <path data-stroke fill="none" strokeWidth="1.4" d="M40 36 L100 16 L160 36 L100 56 Z" />
      <line {...F} x1="100" y1="56" x2="100" y2="84" />
      <line {...F} x1="40" y1="36" x2="40" y2="64" />
      <line {...F} x1="160" y1="36" x2="160" y2="64" />
    </svg>
  );
}

export function ArtSiteReport() {
  return (
    <svg viewBox="0 0 200 100" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {/* report sheet + capture node */}
      <rect {...F} x="58" y="18" width="84" height="64" />
      <line {...F} x1="70" y1="34" x2="118" y2="34" />
      <line {...F} x1="70" y1="46" x2="130" y2="46" />
      <line {...F} x1="70" y1="58" x2="112" y2="58" />
      <line {...F} x1="70" y1="70" x2="124" y2="70" />
      <circle data-stroke fill="none" strokeWidth="1.4" cx="142" cy="34" r="10" />
      <line data-stroke strokeWidth="1.4" x1="142" y1="44" x2="142" y2="58" />
    </svg>
  );
}

export function ArtAcademy() {
  return (
    <svg viewBox="0 0 200 100" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {/* knowledge graph / learning nodes */}
      <path {...F} d="M60 78 L100 22 L140 78" />
      <line {...F} x1="60" y1="78" x2="140" y2="78" />
      <circle data-stroke fill="var(--bg)" strokeWidth="1.4" cx="100" cy="22" r="6" />
      <circle {...F} cx="60" cy="78" r="5" />
      <circle {...F} cx="140" cy="78" r="5" />
      <circle data-stroke fill="var(--bg)" strokeWidth="1.4" cx="100" cy="78" r="5" />
      <line {...F} x1="100" y1="28" x2="100" y2="73" />
    </svg>
  );
}

export function ArtLocked() {
  return (
    <svg viewBox="0 0 200 100" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <rect {...F} strokeDasharray="4 5" x="76" y="44" width="48" height="38" />
      <path {...F} strokeDasharray="4 5" d="M86 44 V34 a14 14 0 0 1 28 0 V44" />
      <circle {...F} cx="100" cy="60" r="4" />
      <line {...F} x1="100" y1="64" x2="100" y2="72" />
    </svg>
  );
}
