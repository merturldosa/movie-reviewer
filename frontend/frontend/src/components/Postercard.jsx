// src/components/PosterCard.jsx
import { IMG, movieTitle } from "../lib/tmdb.js";

export default function PosterCard({ movie, onClick }) {
  if (!movie) return null;
  const title = movieTitle(movie);
  return (
    <button
      onClick={() => onClick && onClick(movie)}
      className="text-left"
      aria-label={title}
    >
      <div className="aspect-[2/3] w-full overflow-hidden rounded-xl ring-1 ring-white/10">
        <img
          src={IMG.w300(movie.poster_path) || IMG.w500(movie.backdrop_path)}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-2 line-clamp-1 text-sm text-neutral-200">{title}</div>
    </button>
  );
}
