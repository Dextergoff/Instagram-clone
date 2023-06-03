import Navbar from "Navbar/Navbar";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
const AwaitData = (props) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  if (props.data !== undefined || null) {
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
        <div style={props.style}>
          <BootstrapSpinner />
        </div>
      </>
    );
  }
};

export default AwaitData;
