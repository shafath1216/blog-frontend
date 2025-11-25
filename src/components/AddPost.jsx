import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPost({ onNewPost }) {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewPost(title, username, content);

    // Clear fields
    setTitle("");
    setUsername("");
    setContent("");

    // Go back to home after submit
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-start py-10 px-4">
      <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded shadow-lg">
        <h1
          className="text-4xl font-bold mb-6 text-center text-white"
          style={{ fontFamily: "'Creepster', cursive", letterSpacing: "1px" }}
        >
          Add Your Ghost Story
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <textarea
              rows={8}
              placeholder="Write your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-red-400 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold transition"
            >
              Submit Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
