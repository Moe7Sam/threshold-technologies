export default function Gateway({ compact = false }: { compact?: boolean }) {
  return <div className={`gateway ${compact ? 'gateway-compact' : ''}`} aria-hidden="true">
    <span className="gate g1" /><span className="gate g2" /><span className="gate g3" /><span className="gate g4" />
    <span className="gate-axis" /><span className="gate-floor" /><span className="gate-pulse" />
  </div>;
}
