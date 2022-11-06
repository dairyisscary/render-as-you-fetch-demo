export default function LoadingIndicator() {
  return (
    <div role="status" aria-live="polite">
      Loading...<span className="sr-only">Loading content</span>
    </div>
  );
}
