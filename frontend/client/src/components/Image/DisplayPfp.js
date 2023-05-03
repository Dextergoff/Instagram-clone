const DisplayPfp = ({ pfp }) => {
  return (
    <div>
      <div className="h6 align-self-center text-light fw-light">
        <img className="pfp" src={pfp} />
      </div>
    </div>
  );
};

export default DisplayPfp;
