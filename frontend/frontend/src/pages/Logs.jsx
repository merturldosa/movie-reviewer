import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Container from "../components/Container.jsx";
import Modal from "../components/Modal.jsx";
import RecordGrid from "../components/RecordGrid.jsx";
import { getRecords } from "../lib/records.js";

export default function Logs() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let on = true;
    (async () => {
      setLoading(true);
      try {
        const data = await getRecords();
        if (on) setRecords(data);
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => { on = false; };
  }, []);

  function openDetail(r) {
    setSelected(r);
    setOpen(true);
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <Container className="py-8">
        {/* 헤더 + 기록하기 버튼 */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold">기록</h1>
          <button
            className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-neutral-200"
            onClick={() => nav("/logs/new")}
          >
            기록하기
          </button>
        </div>

        {/* 목록 (최신순) */}
        <RecordGrid records={records} loading={loading} onSelect={openDetail} />
      </Container>

      {/* 상세기록 팝업 */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={selected ? selected.title : "상세 기록"}
      >
        {selected ? (
          <div className="grid gap-6 md:grid-cols-2">
            {/* 포스터 프리뷰 */}
            <div className="aspect-[2/3] w-full overflow-hidden rounded-xl ring-1 ring-white/10">
              {/* 목록에서 포스터가 이미 로드되었으나, 상세는 단순 프리뷰용으로 다시 보여줌 */}
              {/* 필요한 경우 동일 유틸 재사용 가능 */}
              <img
                src={selected.poster_path ? `https://image.tmdb.org/t/p/w500${selected.poster_path}` : ""}
                alt={selected.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* 텍스트 영역: 제목, 평점, 리뷰 */}
            <div>
              <div className="text-lg font-semibold">
                {selected.title}
              </div>
              <div className="mt-1 text-sm text-neutral-300">
                평점 <span className="font-semibold">⭐ {Number(selected.rating).toFixed(1)}</span>
              </div>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-neutral-200">
                {selected.review || "리뷰 내용이 없습니다."}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-neutral-300">기록을 선택해주세요.</p>
        )}
      </Modal>
    </div>
  );
}
