import { useNavigate } from "react-router-dom";

export default function GhostChatTrigger() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/archive-chat")}
      aria-label="Chat with the ghost"
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 9999,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        minWidth: "6rem",
        padding: "0.75rem 1rem",
        borderRadius: "9999px",
        border: "1px solid rgba(255,255,255,0.15)",
        backgroundColor: "rgba(255,255,255,0.1)",
        color: "#ffffff",
        boxShadow: "0 20px 45px rgba(0,0,0,0.35)",
        backdropFilter: "blur(10px)",
        textAlign: "center",
      }}
    >
      <span style={{
        height: "3.5rem",
        width: "3.5rem",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "9999px",
        backgroundColor: "rgba(248,113,113,0.2)",
        color: "#fca5a5",
        boxShadow: "inset 0 0 0 1px rgba(248,113,113,0.18)",
        fontSize: "2rem",
      }}>
        👻
      </span>
      <span style={{
        textAlign: "center",
        fontSize: "0.65rem",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.9)",
      }}>
        chat with the ghost
      </span>
    </button>
  );
}
