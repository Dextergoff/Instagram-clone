import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
const SubmitButton = (props) => {
  const loading = props.loading || false;
  return (
    <>
      <div className="d-flex justify-content-center">
        {loading ? (
          <BootstrapSpinner />
        ) : (
          <button
            type="submit"
            onClick={() => props.setLoading(true)}
            className="btn btn-black rounded-0 border-secondary text-light mb-5"
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default SubmitButton;
