import getDate from "components/jobs/getDate";
const PostAge = ({ date }) => {
  return (
    <>
      <div className="text-muted">•</div>
      <div className="text-muted">{getDate(date)}</div>
    </>
  );
};

export default PostAge;
