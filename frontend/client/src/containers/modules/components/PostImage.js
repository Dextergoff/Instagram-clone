const PostImage = (props) => {
  return (
    <div>
      <img
        style={{
          maxWidth: "400px",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
        }}
        alt=""
        src={process.env.REACT_APP_API_URL + props.image}
      />
    </div>
  );
};
export default PostImage;
