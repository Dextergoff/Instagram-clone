import getDate from "containers/modules/jobs/getDate"
const TitleAndHashtags = (prop) => {
    const post = prop.post
    return (
        <div className="d-flex gap-2 mb-2">
        <div className="text-light">{getDate(post.date)}</div>
        <div className="text-muted">•</div>
        <div className="text-center fw-bold  text-light ">{post.username}</div>
        <div className="fw-light text-light">{post.title}</div>
        
        {post.hashtags.map((hashtag, index) => (
          <a href={`/h/${hashtag}`} key={index} style={{textDecoration:"none"}} className="text-primary text">#{hashtag}</a>
        ))}
      </div>
    )
}

export default TitleAndHashtags