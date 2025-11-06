export default function PostForm({ newPost, onInputChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post Form</h2>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          name="title"
          type="text"
          value={newPost.title}
          onChange={onInputChange}
        />
      </div>
      <div>
        <label htmlFor="body">Body: </label>
        <input
          id="body"
          name="body"
          type="text"
          value={newPost.body}
          onChange={onInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
