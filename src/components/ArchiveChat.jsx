import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WEBHOOK_URL = "https://n8n.ghost-stories.org/webhook/agent";
const STORAGE_KEY = "archiveChatState";

export default function ArchiveChat() {
  const [sessionId, setSessionId] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let activeSession = crypto.randomUUID();
    let stored = null;

    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      stored = null;
    }

    if (stored?.sessionId) {
      activeSession = stored.sessionId;
    }

    setSessionId(activeSession);
    setChatHistory(Array.isArray(stored?.chatHistory) ? stored.chatHistory : []);
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId, chatHistory }));
  }, [sessionId, chatHistory]);

  const saveMessage = (nextHistory) => {
    setChatHistory(nextHistory);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      setStatus("Type a question for the ghost first.");
      return;
    }

    const userMessage = { id: crypto.randomUUID(), role: "user", text: trimmed, createdAt: new Date().toISOString() };
    const nextHistory = [...chatHistory, userMessage];
    saveMessage(nextHistory);
    setMessage("");
    setStatus("Sending to the archive...");
    setLoading(true);

    const parseMaybeString = (value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();

      const stripCodeFence = (text) => {
        return text.replace(/^```json\s*([\s\S]*?)\s*```$/i, "$1").trim();
      };

      const tryParse = (text) => {
        try {
          return JSON.parse(text);
        } catch {
          return null;
        }
      };

      const withoutFence = stripCodeFence(trimmed);
      const asJson = tryParse(withoutFence);
      if (asJson !== null) return asJson;

      if (trimmed.includes("{") && trimmed.includes("}")) {
        const firstBrace = trimmed.indexOf("{");
        const lastBrace = trimmed.lastIndexOf("}");
        if (firstBrace >= 0 && lastBrace > firstBrace) {
          const jsonBlock = trimmed.slice(firstBrace, lastBrace + 1);
          const parsedBlock = tryParse(jsonBlock);
          if (parsedBlock !== null) return parsedBlock;
        }
      }

      return value;
    };

    const extractGhostText = (value) => {
      const normalized = parseMaybeString(value);

      if (typeof normalized === "string") {
        return normalized.trim();
      }

      if (Array.isArray(normalized)) {
        return extractGhostText(normalized[0]);
      }

      if (normalized && typeof normalized === "object") {
        const candidate = normalized.message ?? normalized.text ?? normalized.response;
        if (candidate !== undefined) {
          return extractGhostText(candidate);
        }
        return JSON.stringify(normalized);
      }

      return String(normalized ?? "");
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: trimmed,
          chatHistory: nextHistory.map(({ role, text }) => ({ role, text })),
        }),
      });

      const data = await response.json();
      let payload = Array.isArray(data) ? data[0] : data;
      const rawText = payload?.message ?? payload?.text ?? payload?.response ?? payload;
      const ghostText = extractGhostText(rawText) || "The ghost heard you. The archive is listening.";

      const ghostMessage = {
        id: crypto.randomUUID(),
        role: "ghost",
        text: ghostText,
        createdAt: new Date().toISOString(),
      };

      saveMessage([...nextHistory, ghostMessage]);
      setStatus("");
    } catch (error) {
      setStatus(`Send failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-between p-4 sm:p-6">
        <header className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Archive Chat</p>
              <h1 className="text-4xl font-bold sm:text-5xl">Speak to the ghost</h1>
            </div>
            <Link
              to="/"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Back home
            </Link>
          </div>
        </header>

        <main className="flex-1 py-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl sm:p-8">
            <div className="mb-6 min-h-[18rem] overflow-y-auto rounded-[1.75rem] border border-white/10 bg-gray-950/80 p-6 shadow-inner">
              {chatHistory.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {chatHistory.map((entry) => (
                    <div key={entry.id} className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 ${entry.role === "user" ? "bg-red-400 text-black" : "bg-white/10 text-white"}`}>
                        <p className="whitespace-pre-wrap">{entry.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400">The archive is quiet.</p>
              )}
            </div>

            <form onSubmit={sendMessage} className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full rounded-3xl border border-white/10 bg-gray-950 p-4 text-white outline-none focus:border-red-400"
                placeholder="Ask the ghost a question..."
              />
              {status && <p className="text-xs text-red-300 italic">{status}</p>}
              <button 
                type="submit" 
                disabled={loading}
                className="rounded-full bg-red-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-red-500 disabled:opacity-50"
              >
                {loading ? "Listening..." : "Send to archive"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}