import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
import { useSelector } from "react-redux";
const NoAuthLayout = (props) => {
  const { loading } = useSelector((state) => state.user);
  if (!loading) {
    return (
      <>
        <style>{"body { background-color: #000; }"}</style>
        <div className="">{props.children}</div>
      </>
    );
  } else {
    return (
      <>
        <style>{"body { background-color: #000; }"}</style>
        <div
          style={{
            position: "fixed" /* or absolute */,
            top: "50%",
            left: "50%",
          }}
        >
          <BootstrapSpinner />
        </div>
      </>
    );
  }
};

export default NoAuthLayout;
