import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal/MovieModal";
import "./Row.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Row({ isLargeRow, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(fetchUrl);
      setMovies(data?.results ?? []);
    })();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    setMovieSelected(movie);  // ✅ 먼저 클릭한 영화 저장
    setModalOpen(true);       // ✅ 그 다음 모달 열기
  };

  return (
    <section className="row" id={id}>
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop
        breakpoints={{
          1378: { slidesPerView: 6, slidesPerGroup: 6 },
          998:  { slidesPerView: 5, slidesPerGroup: 5 },
          625:  { slidesPerView: 4, slidesPerGroup: 4 },
          0:    { slidesPerView: 3, slidesPerGroup: 3 },
        }}
      >
        {movies
          .filter(m => (isLargeRow ? m.poster_path : m.backdrop_path))
          .map((m) => (
            <SwiperSlide key={m.id} style={{ width: isLargeRow ? 200 : 320 }}>
              <img
                className={`row__poster${isLargeRow ? " row__posterLarge" : ""}`}
                src={`https://image.tmdb.org/t/p/${isLargeRow ? "w500" : "w780"}${
                  isLargeRow ? m.poster_path : m.backdrop_path
                }`}
                alt={m.title || m.name || "movie"}
                style={{ padding: "25px 0" }}
                onClick={() => handleClick(m)}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {modalOpen && movieSelected && (
        <MovieModal
          movieId={movieSelected.id} // ✅ 이제 제대로 전달됨!
          onClose={() => setModalOpen(false)}
        />
      )}

    </section>
  );
}
