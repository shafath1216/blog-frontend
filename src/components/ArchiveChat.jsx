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

    if (!WEBHOOK_URL) {
      setStatus("Webhook not configured. Set VITE_N8N_WEBHOOK_URL in .env.");
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
      createdAt: new Date().toISOString(),
    };

    const nextHistory = [...chatHistory, userMessage];
    saveMessage(nextHistory);
    setMessage("");
    setStatus("Sending to the archive...");
    setLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message: trimmed,
          chatHistory: nextHistory.map(({ role, text }) => ({ role, text })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded ${response.status}`);
      }

      const data = await response.json().catch(() => null);
      const parsedMessage = Array.isArray(data)
        ? data[0]?.message
        : data?.message;
      const ghostText = parsedMessage || data?.text || data?.response || "The ghost heard you. The archive is listening.";
      const ghostMessage = {
        id: crypto.randomUUID(),
        role: "ghost",
        text: ghostText,
        createdAt: new Date().toISOString(),
      };

      saveMessage([...nextHistory, ghostMessage]);
      setStatus("The ghost remembered your message.");
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

          <p className="max-w-3xl text-gray-300 sm:text-lg">
            This page is optimized for smaller screens and immersive archive-style chat.
            Your conversation persists across refreshes so the ghost remembers the context.
          </p>
        </header>

        <main className="flex-1">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-red-300/80">Ghost feed</p>
                <h2 className="text-2xl font-semibold text-white">Send your whisper into the archive</h2>
              </div>
              <div className="rounded-2xl bg-gray-900/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-gray-300 shadow-inner shadow-black/20">
                Session: {sessionId ? sessionId.slice(0, 8) : "..."}
              </div>
            </div>

            <div className="mb-6 min-h-[18rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-gray-950/80 p-4 shadow-inner shadow-black/30 sm:p-6">
              {chatHistory.length > 0 ? (
                <div className="flex h-full flex-col gap-4 overflow-y-auto pr-2">
                  {chatHistory.map((entry) => (
                    <div key={entry.id} className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] space-y-2 rounded-3xl px-4 py-3 text-sm leading-6 shadow-[0_20px_40px_rgba(0,0,0,0.2)] ${
                        entry.role === "user"
                          ? "bg-red-400 text-black rounded-br-[1.5rem] rounded-tl-[1.5rem]"
                          : "bg-white/10 text-white rounded-bl-[1.5rem] rounded-tr-[1.5rem]"
                      }`}>
                        <p className="whitespace-pre-wrap">{entry.text}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-300">
                          {entry.role === "user" ? "You" : "Ghost"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid h-full place-items-center rounded-3xl border border-dashed border-white/10 bg-gray-900/70 p-6 text-center text-sm text-gray-400">
                  The archive is quiet. Send a message to start the conversation.
                </div>
              )}
            </div>

            <form className="space-y-4" onSubmit={sendMessage}>
              <label className="block text-sm font-medium text-gray-300" htmlFor="archive-message">
                Message for the ghost
              </label>
              <textarea
                id="archive-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={6}
                className="w-full rounded-3xl border border-white/10 bg-gray-950/90 p-4 text-white outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                placeholder="Ask about forbidden tales, the archive, or the silence between the stars..."
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full bg-red-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Listening..." : "Send to n8n"}
                </button>
                <p className="text-sm text-gray-400">Webhook: {WEBHOOK_URL ? "configured" : "not configured"}</p>
              </div>
            </form>

            {status ? (
              <div className="mt-5 rounded-3xl border border-white/10 bg-gray-900/90 px-4 py-3 text-sm text-gray-200">
                {status}
              </div>
            ) : null}
          </div>
        </main>

        <footer className="mt-8 rounded-3xl border border-white/10 bg-gray-950/80 p-4 text-sm text-gray-400">
          Tip: Your ghost conversation is stored locally, so refreshes keep the history intact.
        </footer>
      </div>
    </div>
  );
}
