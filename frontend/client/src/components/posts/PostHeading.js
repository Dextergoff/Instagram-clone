import getDate from "components/jobs/getDate";
const PostHeading = (props) => {
  return (
    <div className="d-flex gap-1 ">
      <div className="text-center text-light ">{props.post.user.username}</div>
      <div className="text-muted">•</div>
      <div className="text-muted">{getDate(props.post.date)}</div>
    </div>
  );
};

export default PostHeading;
