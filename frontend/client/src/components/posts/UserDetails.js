import getDate from "components/jobs/getDate";
import DisplayPfp from "components/Image/DisplayPfp";
const UserDetails = ({ user }) => {
  return (
    <div className="d-flex align-items-center gap-1 ">
      <DisplayPfp
        style={{ width: "2rem", height: "2rem", borderRadius: "100%" }}
        pfp={process.env.REACT_APP_API_URL + user.pfp}
      />
      <div className="text-center text-light ">{user.username}</div>
    </div>
  );
};

export default UserDetails;
