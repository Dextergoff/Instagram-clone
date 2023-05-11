const LoadBtn = ({ parent, eod, replyState, setReplySate }) => {
  const { open } = replyState;
  const loadReplys = (prop) => {
    setReplySate({ ...replyState, parent: prop, skip: false, open: true });
  };
  const hideReplys = () => {
    setReplySate({ ...replyState, open: false });
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

export default LoadBtn;
