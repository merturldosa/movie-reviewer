import PosterCard from "./PosterCard.jsx";

export default function PosterGrid({
  title = "인기 콘텐츠",
  movies = [],
  onSelect,
  loading = false,
  rows = 1,
}) {
  const take = Math.min(movies.length, Math.max(1, rows) * 6);
  const shown = (loading ? [] : movies).slice(0, take);
  const placeholders = Array.from({ length: take || rows * 6 || 6 });

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-semibold text-white">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {(loading ? placeholders : shown).map((m, i) =>
          loading ? (
            <div key={i} className="animate-pulse">
              <div className="aspect-[2/3] w-full rounded-xl bg-neutral-800" />
              <div className="mt-2 h-4 w-24 rounded bg-neutral-800" />
            </div>
          ) : (
            <PosterCard key={m.id} movie={m} onClick={onSelect} />
          )
        )}
      </div>
    </section>
  );
}
