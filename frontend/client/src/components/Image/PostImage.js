const PostImage = (props) => {
  return (
    <img
      style={props.style}
      className="post-image"
      src={process.env.REACT_APP_API_URL + props.image}
    />
  );
};
export default PostImage;
