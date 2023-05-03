const PostImage = (props) => {
  return (
    <div>
      <img
        className="post-image"
        style={props.style}
        src={process.env.REACT_APP_API_URL + props.image}
      />
    </div>
  );
};
export default PostImage;
