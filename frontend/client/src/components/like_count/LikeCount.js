const LikeCount = ({ data }) => {
  return (
    <>
      {data.likecount > 0 ? (
        <div className="text-light fw-bold">{data.likecount} likes</div>
      ) : (
        <></>
      )}
    </>
  );
};

export default LikeCount;
