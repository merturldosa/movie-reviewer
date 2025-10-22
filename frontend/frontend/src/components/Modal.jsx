export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;

  function onKey(e) {
    if (e.key === "Escape") onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onKeyDown={onKey}
      className="fixed inset-0 z-50 flex items-start justify-center"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 mx-auto mt-20 w-[min(90vw,900px)] rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10">
        {title && <h3 className="mb-3 text-lg font-semibold">{title}</h3>}
        {children}
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-3 top-3 rounded-md bg-white/10 px-2 py-1 text-sm hover:bg-white/20"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
