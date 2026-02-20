export default function MetricsCard({ title, value, accent = 'blue', subtitle }) {
  return (
    <article className={`metric-card metric-${accent}`}>
      <p className="metric-title">{title}</p>
      <h3>{value}</h3>
      {subtitle ? <p className="metric-subtitle">{subtitle}</p> : null}
    </article>
  );
}
