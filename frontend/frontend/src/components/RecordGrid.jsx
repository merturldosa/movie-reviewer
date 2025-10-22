// src/components/RecordGrid.jsx
import RecordCard from "./RecordCard.jsx";

export default function RecordGrid({ records = [], loading = false, onSelect }) {
  const placeholders = Array.from({ length: Math.max(6, records.length) });

  return (
    <section className="mt-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {(loading ? placeholders : records).map((r, i) =>
          loading ? (
            <div key={i} className="animate-pulse">
              <div className="aspect-[2/3] w-full rounded-xl bg-neutral-800" />
            </div>
          ) : (
            <RecordCard key={r.id} record={r} onClick={onSelect} />
          )
        )}
      </div>
      {!loading && records.length === 0 && (
        <p className="mt-6 text-sm text-neutral-400">아직 작성한 기록이 없습니다.</p>
      )}
    </section>
  );
}
