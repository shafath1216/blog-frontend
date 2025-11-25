import { useParams, Link } from "react-router-dom";

export default function PostDetail({ posts }) {
  const { id } = useParams(); // Get the post ID from the URL
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900 p-4">
        <h2 className="text-3xl mb-4">Story Not Found</h2>
        <Link to="/" className="text-red-400 hover:text-red-600">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1
          className="text-4xl font-bold mb-4 text-center"
          style={{ fontFamily: "'Creepster', cursive", letterSpacing: "1px" }}
        >
          {post.title}
        </h1>

        <p className="text-gray-400 italic mb-6 text-center">
          By {post.username}
        </p>

        <p className="text-lg leading-relaxed whitespace-pre-wrap">
          {post.story}
        </p>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-red-400 hover:text-red-600 font-semibold"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
