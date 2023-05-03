
const DisplayPfp = ({pfp}) => {

  return (
    <div>
        <div className="h6 align-self-center text-light fw-light">
          <img 
            id="pfp"
            style={{ width: "70px", height: "70px", borderRadius: "100%" }}
            src={pfp}
          />
        </div>
    </div>
  );
};

export default DisplayPfp;
