const DisplayPfp = (props) => {
  return (
    <div>
      <div className="h6 align-self-center text-light fw-light">
        <img style={props.style} className="pfp" src={props.pfp} />
      </div>
    </div>
  );
};

export default DisplayPfp;
