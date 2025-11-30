// Add a new post
export const addPostToServer = async (title, username, story) => {
  const response = await fetch('http://localhost:3000/api/posts', {
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
  const response = await fetch('http://localhost:3000/api/posts');
  return await response.json();
};

// Delete a post
export const deletePostFromServer = async (postId) => {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  console.log("Deleted Post:", data.id);
  return data.id;
};

// Optional: edit post
export const editPostOnServer = async (postId, updatedPost) => {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost)
  });
  return await response.json();
};
