import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoadContent = ({ data, states }) => {
  const { page } = states.state;
  const LoadContent = () => {
    states.setState({ ...states.state, page: page + 1 });
  };
  return (
    <>
      {!data.end_of_data ? (
        <div className="d-flex justify-content-center mt-5">
          <button className="btn" onClick={() => LoadContent()}>
            <FontAwesomeIcon
              size="xl"
              className="text-light"
              icon="fa-regular fa-square-plus"
            />
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default LoadContent;
