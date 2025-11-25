import { Link } from "react-router-dom";

export default function PostList({ posts }) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return <p className="text-gray-400 text-center">No stories yet.</p>;
  }

  return (
    <ul className="flex flex-wrap gap-4 justify-center">
      {posts.map((post) => (
        <li
          key={post.id}
          className="p-4 bg-gray-800 rounded shadow hover:bg-gray-700 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center w-full md:w-1/2"
        >
          {/* Title */}
          <Link
            to={`/post/${post.id}`}
            className="text-2xl font-bold text-white hover:text-red-400 transition mb-2 md:mb-0"
            style={{
              fontFamily: "'Creepster', cursive",
              letterSpacing: "1px",
              textShadow: "0 0 6px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.3)",
            }}
          >
            {post.title}
          </Link>

          {/* Author */}
          <span className="text-white italic text-sm">
            {post.username}
          </span>
        </li>
      ))}
    </ul>
  );
}

