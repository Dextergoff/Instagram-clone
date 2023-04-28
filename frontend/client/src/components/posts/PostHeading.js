const PostHeading = (props) => {
    return (
        <div className="d-flex gap-1 ">
        <div className="text-center text-light ">{props.username}</div>
      </div>
    )
}

export default PostHeading