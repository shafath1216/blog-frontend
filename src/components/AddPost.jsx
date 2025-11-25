// AddPost.jsx
import React, { useState } from "react";

export default function AddPost({ onNewPost }) {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewPost(title, username, content);
    setTitle("");
    setUsername("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Post
      </button>
    </form>
  );
}
