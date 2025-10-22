// src/components/RatingBadge.jsx
export default function RatingBadge({ value }) {
  return (
    <div
      aria-label={`평점 ${value}`}
      className="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold ring-1 ring-white/10"
    >
      <span role="img" aria-hidden="true">⭐</span>
      <span className="ml-1">{Number(value).toFixed(1)}</span>
    </div>
  );
}
