import { Link } from "react-router-dom";
const InfoBar = ({ requested_user, location }) => {
  return (
    <div className="d-flex gap-5 mt-4 mb-3 justify-content-center">
      <div className="h6 align-self-center text-light fw-light">
        <Link
          className="comments-link text-light fw-light text-decoration-none"
          to={`/followers/`}
          state={{
            background: location,
            requested_user: requested_user,
          }}
        >
          Followers {requested_user.followers_count}
        </Link>
      </div>
      <div className="h6 align-self-center text-light fw-light">
        <Link
          className="comments-link text-light fw-light text-decoration-none"
          to={`/following/`}
          state={{
            background: location,
            requested_user: requested_user,
          }}
        >
          Following {requested_user.following_count}
        </Link>
      </div>
    </div>
  );
};
export default InfoBar;
