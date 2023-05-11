const GalleryImages = (props) => {
  return (
    <div>
      <img
        alt=""
        style={props.style}
        src={process.env.REACT_APP_API_URL + props.image}
      />
    </div>
  );
};
export default GalleryImages;
