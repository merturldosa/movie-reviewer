import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Container from "../components/Container.jsx";
import { searchMovies, movieTitle, IMG } from "../lib/tmdb.js";
import { saveRecord } from "../lib/records.js";

export default function NewLog() {
  const nav = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    const movies = await searchMovies(q);
    setResults(movies);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedMovie || isSaving) return;

    setIsSaving(true);
    try {
      await saveRecord({
        tmdbId: selectedMovie.id,
        title: movieTitle(selectedMovie),
        poster_path: selectedMovie.poster_path,
        rating: Number(rating),
        review: review.trim(),
      });
      nav("/logs");
    } catch (err) {
      console.error("Failed to save record", err);
      alert("저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  }

  // 영화 선택 화면
  if (!selectedMovie) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <Navbar />
        <Container className="py-8">
          <h1 className="text-xl font-bold">새 기록: 영화 선택</h1>
          <form onSubmit={handleSearch} className="mt-4 flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="리뷰할 영화를 검색하세요..."
              className="flex-grow rounded-lg bg-neutral-900 px-3 py-2 text-sm ring-1 ring-white/10 placeholder:text-neutral-500 focus:outline-none focus:ring-white/30"
            />
            <button type="submit" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200">
              검색
            </button>
          </form>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((movie) => (
              <button key={movie.id} onClick={() => setSelectedMovie(movie)} className="text-left">
                <div className="aspect-[2/3] w-full overflow-hidden rounded-xl ring-1 ring-white/10">
                  <img src={IMG.w300(movie.poster_path)} alt={movieTitle(movie)} className="h-full w-full object-cover" />
                </div>
                <div className="mt-2 text-sm text-neutral-200 truncate">{movieTitle(movie)}</div>
              </button>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  // 기록 작성 화면
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <Container className="py-8">
        <h1 className="text-xl font-bold">새 기록: {movieTitle(selectedMovie)}</h1>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="aspect-[2/3] w-full max-w-sm overflow-hidden rounded-xl ring-1 ring-white/10">
            <img src={IMG.w500(selectedMovie.poster_path)} alt={movieTitle(selectedMovie)} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-neutral-300">평점</label>
              <input
                id="rating"
                type="range" min="0.5" max="5" step="0.5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full mt-1"
              />
              <div className="text-center font-bold text-xl">⭐ {Number(rating).toFixed(1)}</div>
            </div>
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-neutral-300">감상평</label>
              <textarea
                id="review"
                rows="8"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="영화에 대한 감상을 자유롭게 남겨주세요."
                className="w-full mt-1 rounded-lg bg-neutral-900 px-3 py-2 text-sm ring-1 ring-white/10 placeholder:text-neutral-500 focus:outline-none focus:ring-white/30"
              />
            </div>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => setSelectedMovie(null)}
                    className="flex-1 rounded-lg bg-neutral-800 px-4 py-2.5 text-sm font-semibold hover:bg-neutral-700"
                >
                    영화 다시 선택
                </button>
                <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200 disabled:bg-neutral-400"
                >
                    {isSaving ? "저장 중..." : "기록 저장"}
                </button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
