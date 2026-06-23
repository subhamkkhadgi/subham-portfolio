import "./states.css";

/**
 * Reusable status message used by every section:
 *   <StateMessage kind="loading" text="Loading hero..." />
 *   <StateMessage kind="error"   text="..." />
 *   <StateMessage kind="empty"   text="No content yet." />
 */
export default function StateMessage({ kind = "loading", text }) {
  const cls = `state-message state-${kind}`;
  const fallback = {
    loading: "Loading...",
    error:   "Something went wrong loading this section.",
    empty:   "No content has been published in this section yet.",
  }[kind];

  return <div className={cls}>{text || fallback}</div>;
}
