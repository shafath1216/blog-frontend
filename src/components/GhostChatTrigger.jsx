import { useNavigate } from "react-router-dom";

export default function GhostChatTrigger() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/archive-chat")}
      aria-label="Chat with the ghost"
      style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 9999 }}
      className="inline-flex min-w-[6rem] flex-col items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-white shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:border-white/30 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-transparent"
    >
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-400/20 text-5xl text-red-300 shadow-[inset_0_0_0_1px_rgba(248,113,113,0.18)]">
        👻
      </span>
      <span className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
        chat with the ghost
      </span>
    </button>
  );
}
