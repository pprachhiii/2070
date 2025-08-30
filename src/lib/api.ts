export async function createTimeline(d: { name?: string; year?: 2025 | 2070 }) {
  const res = await fetch("/api/timeline", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
  return res.json();
}
