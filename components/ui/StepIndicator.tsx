export function StepIndicator({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label: string;
}) {
  return (
    <div
      className="step-indicator"
      aria-label={`${label}: ${current} de ${total}`}
    >
      <span>{label}</span>
      <strong>
        {current} <small>/ {total}</small>
      </strong>
    </div>
  );
}
