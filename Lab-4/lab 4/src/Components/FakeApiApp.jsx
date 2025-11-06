import { useState, useEffect } from "react";
import PostsContainer from "./PostsContainer";
import PostForm from "./PostForm";

export default function FakeApiApp() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL);
      const posts = await response.json();
      setData(posts);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAddPost = () => {
    const postToAdd = {
      id: Date.now(),
      title: newPost.title,
      body: newPost.body,
    };
    setData([postToAdd, ...data]);
    setNewPost({ title: "", body: "" });
  };

  const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Fake API App</h1>
      <PostForm
        newPost={newPost}
        onInputChange={handleInputChange}
        onSubmit={handleAddPost}
      />
      {loading && <p>Loading...</p>}
      <PostsContainer posts={data} />
    </div>
  );
}
//