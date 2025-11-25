import PostList from "./PostList";

export default function Home({ posts }) {
  
  return (
    <main>
      {/* List of Post Titles */}
      <PostList posts={posts} />
    </main>
  );
}