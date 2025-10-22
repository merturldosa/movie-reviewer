import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Modal from "../components/Modal.jsx";
import Hero from "../components/Trailer.jsx";
import PosterGrid from "../components/PosterGrid.jsx";
import Container from "../components/Container.jsx";
import {
  getTrending,
  getPopular,
  getMovieVideos,
  movieTitle,
  GENRES,
  getPopularByGenre,
} from "../lib/tmdb.js";

export default function Home() {
  const [hero, setHero] = useState(null);
  const [popular, setPopular] = useState([]);
  const [byGenre, setByGenre] = useState({});
  const [loadingGenres, setLoadingGenres] = useState(true);

  const [trailerKey, setTrailerKey] = useState(null);
  const [openTrailer, setOpenTrailer] = useState(false);
  const [openText, setOpenText] = useState(false);
  const [selected, setSelected] = useState(null);

  // 원하는 표시 순서
  const GENRE_ORDER = ["범죄", "스릴러", "SF", "호러", "로맨스", "어린이", "다큐멘터리"];

  useEffect(() => {
    (async () => {
      const [trend, pop] = await Promise.all([getTrending(), getPopular()]);
      setHero(trend?.[0] ?? null);
      setPopular(pop);

      setLoadingGenres(true);
      const pairs = await Promise.all(
        GENRE_ORDER.map(async (name) => {
          const id = GENRES[name];
          const list = await getPopularByGenre(id);
          return [id, list];
        })
      );
      const map = {};
      pairs.forEach(([id, list]) => {
        map[id] = list;
      });
      setByGenre(map);
      setLoadingGenres(false);
    })();
  }, []);

  async function handleOpenTrailer(m) {
    const key = await getMovieVideos(m.id);
    setSelected(m);
    setTrailerKey(key);
    setOpenTrailer(true);
  }
  function handleOpenText(m) {
    setSelected(m);
    setOpenText(true);
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <Container className="pb-16">
        <Hero movie={hero} onOpenTrailer={handleOpenTrailer} />

        {/* 1) 인기 콘텐츠 1줄 */}
              <PosterGrid
                title="인기 콘텐츠"
                movies={popular}
                rows={1}
                onSelect={handleOpenTrailer}  // ✅ 클릭 시 예고편 모달 열기
               />

        {/* 2) 장르별 2줄씩 */}
          {loadingGenres ? (
            <p className="text-center mt-10">🎬 장르별 콘텐츠 불러오는 중...</p>
          ) : (
            GENRE_ORDER.map((name) => {
              const id = GENRES[name];
              const movies = byGenre[id] || [];
              return (
              <PosterGrid
                key={id}
                title={`인기 콘텐츠 — ${name}`}
                movies={movies}
                rows={2}
                loading={false}
                onSelect={handleOpenTrailer}   // ✅ 클릭 시 예고편 모달
              />

              );
            })
          )}


      </Container>

      {/* 예고편 모달 */}
      <Modal
        open={openTrailer}
        onClose={() => setOpenTrailer(false)}
        title={selected ? movieTitle(selected) : "예고편"}
      >
        {trailerKey ? (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
              title="YouTube trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-neutral-300">예고편을 찾지 못했어요 😅</p>
        )}
      </Modal>

      {/* 제목 + 줄거리 모달 */}
      <Modal
        open={openText}
        onClose={() => setOpenText(false)}
        title={selected ? movieTitle(selected) : "정보"}
      >
        <p className="whitespace-pre-line leading-relaxed text-neutral-200">
          {selected?.overview || "줄거리 정보가 없습니다."}
        </p>
      </Modal>
    </div>
  );
}
