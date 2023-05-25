const TitleAndHashtags = (prop) => {
  const post = prop.post;
  return (
    <div className="d-flex gap-1 ">
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
