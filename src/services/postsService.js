const API_BASE = 'http://192.168.0.140/api';

// Add a new post
export const addPostToServer = async (title, username, story) => {
  const response = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, username, story })
  });
  return await response.json();
};

// Get all posts
export const getPostsFromServer = async () => {
  const response = await fetch(`${API_BASE}/posts`);
  return await response.json();
};

// Delete a post
export const deletePostFromServer = async (postId) => {
  const response = await fetch(`${API_BASE}/posts/${postId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  console.log("Deleted Post:", data.id);
  return data.id;
};

