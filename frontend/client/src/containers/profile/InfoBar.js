const InfoBar = ({ requested_user }) => {
  return (
    <div className="d-flex gap-5 mt-4 mb-3 justify-content-center">
      <div className="h6 align-self-center text-light fw-light">
        Followers {requested_user.followers_count}
      </div>
      <div className="h6 align-self-center text-light fw-light">
        Following {requested_user.following_count}
      </div>
    </div>
  );
};
export default InfoBar;
