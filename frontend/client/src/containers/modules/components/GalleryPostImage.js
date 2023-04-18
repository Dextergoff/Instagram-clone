const GalleryPostImage = (props) => {
    return (
      <div>
         <img alt="" src={process.env.REACT_APP_API_URL + props.image} />
      </div>
    );
  };
  export default GalleryPostImage;
  