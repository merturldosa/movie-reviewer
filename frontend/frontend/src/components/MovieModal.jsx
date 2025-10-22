import { useEffect, useState } from "react";
import { getMovieVideos } from "../lib/tmdb";

function MovieModal({ movieId, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      const key = await getMovieVideos(movieId);
      console.log("🎬 예고편 키 확인:", key, "영화 ID:", movieId);
      setTrailerKey(key);
    };
    fetchTrailer();
  }, [movieId]);

  const handleClose = () => {
    setTrailerKey(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-xl p-4 relative w-[80%] max-w-3xl">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-white text-xl"
        >
          ✕
        </button>


      {trailerKey ? (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="예고편"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <p className="text-center text-white mt-6">
          예고편을 찾지 못했어요 😅
        </p>
      )}



        {trailerKey ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="예고편"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <p className="text-center text-white mt-6">
            예고편을 찾지 못했어요 😅
          </p>
        )}
      </div>
    </div>
  );
}

export default MovieModal;
