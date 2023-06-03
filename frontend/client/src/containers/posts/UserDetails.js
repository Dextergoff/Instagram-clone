import getDate from "components/jobs/getDate";
import DisplayPfp from "components/Image/DisplayPfp";
const UserDetails = (props) => {
  const style = props.style || {
    width: "2rem",
    height: "2rem",
    borderRadius: "100%",
  };
  return (
    <a href={`u/${props.user.pk}`} style={{ textDecoration: "none" }}>
      <div className="d-flex align-items-center gap-2 ">
        <DisplayPfp
          style={style}
          pfp={process.env.REACT_APP_API_URL + props.user.pfp}
        />
        <div className="text-center text-light ">{props.user.username}</div>
      </div>
    </a>
  );
};

export default UserDetails;
