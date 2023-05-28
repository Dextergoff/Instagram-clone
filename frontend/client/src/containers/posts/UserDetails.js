import getDate from "components/jobs/getDate";
import DisplayPfp from "components/Image/DisplayPfp";
const UserDetails = (props) => {
  const style = props.style || {
    width: "2rem",
    height: "2rem",
    borderRadius: "100%",
  };
  return (
    <div className="d-flex align-items-center gap-3 ">
      <DisplayPfp
        style={style}
        pfp={process.env.REACT_APP_API_URL + props.user.pfp}
      />
      <div className="text-center text-light ">{props.user.username}</div>
    </div>
  );
};

export default UserDetails;
