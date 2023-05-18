import Navbar from "Navbar/Navbar";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import BootstrapSpinner from "components/bootstrap/BootstrapSpinner";
const Layout = (props) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  if (isAuthenticated) {
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

export default Layout;
