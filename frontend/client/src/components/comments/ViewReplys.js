const ViewReplys = ({ parent, eod, states }) => {
  const { open } = states.state;
  const loadReplys = (prop) => {
    states.setState({...states.state,  parent: prop, skip: false, open: true });
  };
  const hideReplys = () => {
    states.setState({...states.state, open: false });
  };
  return (
    <>
      {parent.children > 0 ? (
        <div
          onClick={() => loadReplys(parent.pk)}
          className={`text-muted mb-2 ${open ? "d-none" : ""}`}
        >
          View reply's
        </div>
      ) : (
        <></>
      )}
      {eod && open == true ? (
        <div onClick={() => hideReplys()} className="text-muted mb-2">
          Hide reply's
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewReplys;
