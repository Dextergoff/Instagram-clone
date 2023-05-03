const TitleAndHashtags = (prop) => {
  const post = prop.post;
  return (
    <div className="d-flex gap-2 mb-2">
      <div className="text-center fw-bold  text-light ">
        {post.user.username}
      </div>
      <div className="fw-light text-light">{post.title}</div>

      {post.hashtags.map((hashtag, index) => (
        <a
          href={`/h/${hashtag}`}
          key={index}
          style={{ textDecoration: "none" }}
          className="text-primary text"
        >
          #{hashtag}
        </a>
      ))}
    </div>
  );
};

export default TitleAndHashtags;
