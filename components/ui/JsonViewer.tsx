export function JsonViewer({
  title,
  value,
}: {
  title: string;
  value: Record<string, unknown>;
}) {
  return (
    <div className="json-viewer">
      <div className="json-viewer__bar">
        <span className="json-viewer__dot" aria-hidden="true" />
        <span>{title}</span>
        <span>JSON</span>
      </div>
      <pre tabIndex={0}>
        <code>{JSON.stringify(value, null, 2)}</code>
      </pre>
    </div>
  );
}
