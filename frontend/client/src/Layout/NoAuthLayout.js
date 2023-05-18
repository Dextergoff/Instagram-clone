const NoAuthLayout = (props) => {
  return (
    <>
      <style>{"body { background-color: #000; }"}</style>
      <div className="">{props.children}</div>
    </>
  );
};

export default NoAuthLayout;
