const API = "https://api.themoviedb.org/3";
const KEY = import.meta.env.VITE_TMDB_API_KEY;
const lang = "ko-KR";

export const IMG = {
  w300: (p) => (p ? `https://image.tmdb.org/t/p/w300${p}` : ""),
  w500: (p) => (p ? `https://image.tmdb.org/t/p/w500${p}` : ""),
  original: (p) => (p ? `https://image.tmdb.org/t/p/original${p}` : ""),
};

async function get(url) {
  const res = await fetch(
    `${API}${url}${url.includes("?") ? "&" : "?"}api_key=${KEY}&language=${lang}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getMovieVideos(id) {
  try {
    const data = await get(`/movie/${id}/videos`);
    const video =
      data.results.find(
        (v) =>
          v.site === "YouTube" &&
          ["Trailer", "Teaser", "Clip", "Featurette"].includes(v.type)
      ) || null;
    return video ? video.key : "YoHD9XEInc0"; // ✅ fallback 추가!
  } catch (err) {
    console.error("🎬 예고편 로드 실패:", err);
    return "YoHD9XEInc0"; // ✅ fallback 추가!
  }
}


export async function getTrending() {
  const data = await get(`/trending/movie/week`);
  return data.results;
}

export async function getPopular(page = 1) {
  const data = await get(`/movie/popular?page=${page}`);
  return data.results;
}

export async function getMovieDetails(id) {
  return get(`/movie/${id}`);
}

export function movieTitle(m) {
  return m.title || m.name || "제목 없음";
}

export const GENRES = {
  범죄: 80,
  스릴러: 53,
  SF: 878,
  호러: 27,
  로맨스: 10749,
  어린이: 10751,
  다큐멘터리: 99,
};

export async function getPopularByGenre(genreId, page = 1) {
  const data = await get(
    `/discover/movie?sort_by=popularity.desc&with_genres=${genreId}&page=${page}&include_adult=false`
  );
  return data.results;
}

export async function searchMovies(query, page = 1) {
  const q = encodeURIComponent(query);
  const data = await get(
    `/search/movie?query=${q}&page=${page}&include_adult=false`
  );
  return data.results;
}
