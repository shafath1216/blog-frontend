import NavBar from "./components/Navbar";
import Home from "./components/Home";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import { getPostsFromServer,addPostToServer } from "./services/postsService";
import AddPost from "./components/AddPost";

function App() {
  const [posts, setPosts] = useState([]);
  

   //Load initial posts from server
   useEffect(() => {
    getPostsFromServer().then((loadedPosts) => {
      setPosts(loadedPosts);
    });
  }, []);
   
  const handleNewPost = async (title, username, story) => {
    try {
       //Send post to server
      const savedPost = await addPostToServer(title, username, story);
      
      // Update front-end state with server response
      setPosts([...posts, savedPost]);
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to add post. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar />

      <Routes>
  <Route path="/" element={<Home posts={posts} />} />
  <Route path="/post/:id" element={<PostDetail posts={posts} />} />
  <Route path="/add-post" element={<AddPost onNewPost={handleNewPost} />} />
</Routes>

    </div>
  );
}

export default App;
