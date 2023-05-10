import "bootstrap/dist/css/bootstrap.min.css";
import "./css/navbar.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(true);
  let prevScrollPosition = window.scrollY;

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > prevScrollPosition) {
      // User has scrolled down
      setIsOpen(false);
    } else {
      // User has scrolled up
      setIsOpen(true);
    }
  };

  window.addEventListener("scroll", handleScroll);

  if (isAuthenticated)
    return (
      <nav
        id={isOpen ? "navbar" : "hidenavbar"}
        className="navbar navbar-expand-lg  bg-dark fixed-bottom bg-body-tertiary"
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto justify-content-center">
              <li className="nav-item">
                <NavLink className="nav-link mx-5" to="/">
                  <FontAwesomeIcon
                    className="text-light"
                    icon="fa-regular fa-building"
                    size="xl"
                  />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-5" to="/">
                  <FontAwesomeIcon
                    className="text-light"
                    icon="fa-regular fa-compass"
                    size="xl"
                  />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-5" to="/create">
                  <FontAwesomeIcon
                    className="text-light"
                    icon="fa-regular fa-plus-square"
                    size="xl"
                  />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-5" to="/">
                  <FontAwesomeIcon
                    className="text-light"
                    icon="fa-regular fa-paper-plane"
                    size="xl"
                  />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-5" to="/u">
                  <FontAwesomeIcon
                    className="text-light"
                    icon="fa-regular fa-user"
                    size="xl"
                  />
                </NavLink>
              </li>

              {/* <li className="nav-item">
              <NavLink  onClick={() => dispatch(logout())}  className="nav-link mx-5" to="/">
                      <FontAwesomeIcon icon={faPersonWalkingArrowRight}  size="xl"/>
                    </NavLink>
            </li> */}
            </ul>
          </div>
        </div>
      </nav>
    );
};

export default Navbar;
