import getDate from "components/jobs/getDate";
import DisplayPfp from "components/Image/DisplayPfp";
const PostHeading = (props) => {
  return (
    <div className="d-flex align-items-center gap-1 ">
      <DisplayPfp
        style={{ width: "2rem", height: "2rem", borderRadius: "100%" }}
        pfp={process.env.REACT_APP_API_URL + props.post.user.pfp}
      />
      <div className="text-center text-light ">{props.post.user.username}</div>
      <div className="text-muted">•</div>
      <div className="text-muted">{getDate(props.post.date)}</div>
    </div>
  );
};

export default PostHeading;
