import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import { getPostsFromServer } from "./services/postsService";
import AddPost from "./components/AddPost";

function App() {
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      title: "The Vanishing Hitchhiker", 
      username: "Alice", 
      story: `Late at night, I was driving along the lonely highway, fog curling around the dim streetlights. 
        I saw a young woman standing by the roadside, shivering in a pale dress. I stopped and offered her a ride. 
        She climbed in silently, eyes staring straight ahead. We drove in tense silence. 
        As we reached the old bridge, I glanced at her. The seat was empty. 
        Heart pounding, I turned back—there was no sign of her anywhere. 
        Locals later told me of a girl who vanished on that very road decades ago. I had just given her a lift…` 
    },
    { 
      id: 2, 
      title: "Whispers in the Attic", 
      username: "Bob", 
      story: `Every night, my house seemed to breathe. Faint whispers echoed from the attic. 
        I climbed the creaking stairs, each step echoing in the dark. Dusty boxes were scattered around, but no one was there. 
        Then I found an old trunk containing letters warning of a family curse: "He who hears whispers will never be alone." 
        The whispers grew louder as the candle flickered. I wanted to run, but my feet refused. 
        And that night, I heard my own name being whispered back at me…` 
    },
    { 
      id: 3, 
      title: "Midnight in the Graveyard", 
      username: "Charlie", 
      story: `The cemetery was silent except for the rustling of dry leaves. 
        I wandered among the tombstones, the moonlight casting grotesque shadows. Suddenly, I felt a presence. 
        Every shadow seemed to shift unnaturally. Footsteps echoed behind me, but when I turned, no one was there. 
        A cold hand brushed against my shoulder. I spun around—only to find my own footprints leading straight to a freshly dug grave. 
        I realized I was not alone in the graveyard, and something was following me…` 
    },
    { 
      id: 4,
      title: "The Reflection in the Mirror",
      username: "Diana",
      story: `I inherited an antique mirror from my grandmother’s attic. 
        The first night I placed it in my room, I noticed something odd. The reflection was not quite right. 
        It would linger for a second longer, move slightly differently, and sometimes smile when I didn’t. 
        I tried covering it, but it seemed to creep closer to the bed each night. 
        One evening, I reached to touch it—and my reflection reached back first. 
        I have not dared sleep in that room since…` 
    },
    { 
      id: 5,
      title: "Footsteps Behind Me",
      username: "Ethan",
      story: `Walking home alone through the empty streets, I kept hearing footsteps echoing mine. 
        At first, I thought it was my imagination. I stopped, and the footsteps stopped. 
        I ran, and they ran. I dared to look back—they matched mine perfectly, but there was no one there. 
        The shadows of the streetlamps stretched and twisted, forming shapes that seemed almost human. 
        By the time I reached my house, I was certain something was following me—not a person, but something far older. 
        Every night since, I hear those footsteps outside my window…` 
    }
  ]);
  

  // Load initial posts from server
  //useEffect(() => {
    //getPostsFromServer().then((loadedPosts) => {
      //setPosts(loadedPosts);
    //});
  //}, []);

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
