import { IMG, movieTitle } from "../lib/tmdb.js";

export default function Hero({ movie, onOpenTrailer }) {
  if (!movie) return null; // movie가 없으면 렌더링 안 함
  const title = movieTitle(movie);

  return (
    <section className="my-6">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl ring-1 ring-neutral-800">
        <img
          src={IMG.original(movie.backdrop_path) || IMG.w500(movie.poster_path)}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 max-w-xl">
          <h1 className="text-2xl font-bold text-white drop-shadow">{title}</h1>
          <p className="mt-2 line-clamp-3 text-sm text-neutral-200">{movie.overview}</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => onOpenTrailer(movie)}
              className="rounded-xl bg-white px-4 py-2 text-black font-semibold hover:bg-neutral-200"
            >
              예고편 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
