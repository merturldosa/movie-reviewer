// src/components/RecordCard.jsx
import RatingBadge from "./RatingBadge.jsx";
import { imgUrlFromPosterPath } from "../lib/records.js";

export default function RecordCard({ record, onClick }) {
  if (!record) return null;
  const img = imgUrlFromPosterPath(record.poster_path);

  return (
    <button
      onClick={() => onClick?.(record)}
      className="group relative aspect-[2/3] w-full overflow-hidden rounded-xl ring-1 ring-white/10"
      aria-label={`${record.title} 평점 ${record.rating}`}
    >
      {/* 배경 포스터 */}
      <img
        src={img}
        alt={record.title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      {/* 아래부터 위로 그라데이션 → 제목 식별성 확보 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      {/* 평점 뱃지 */}
      <RatingBadge value={record.rating} />
      {/* 제목 (좌하단) */}
      <div className="pointer-events-none absolute bottom-2 left-3 right-3 line-clamp-2 text-left text-sm font-semibold text-white drop-shadow">
        {record.title}
      </div>
    </button>
  );
}
