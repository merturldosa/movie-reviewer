// src/pages/Search.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Container from "../components/Container.jsx";
import PosterGrid from "../components/PosterGrid.jsx";
import Modal from "../components/Modal.jsx";
import { searchMovies, movieTitle } from "../lib/tmdb.js";

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const data = q ? await searchMovies(q) : [];
      if (alive) {
        setResults(data);
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [q]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <Container className="pb-16">
        <h1 className="pt-6 text-xl font-bold">검색: “{q}”</h1>

        <PosterGrid
          title="검색 결과"
          movies={results}
          loading={loading}
          onSelect={(m) => { setSelected(m); setOpen(true); }}
        />

        <Modal open={open} onClose={() => setOpen(false)} title={selected ? movieTitle(selected) : "정보"}>
          <p className="whitespace-pre-line leading-relaxed text-neutral-200">
            {selected?.overview || "줄거리 정보가 없습니다."}
          </p>
        </Modal>
      </Container>
    </div>
  );
}
