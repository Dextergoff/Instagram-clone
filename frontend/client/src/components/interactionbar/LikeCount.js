const LikeCount = ({ data, style }) => {
  return (
    <>
      {data.likecount > 0 ? (
        <div style={style} className="">
          {data.likecount} likes
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default LikeCount;
