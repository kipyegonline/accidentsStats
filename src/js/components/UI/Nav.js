import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HashRouter as HRouter, Route, NavLink as NF } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const toggle = () => setIsOpen(!isOpen);

  const style = {
    borderBottom: "1px solid red",
    fontWeight: "bold",
  };
  return (
    <HRouter>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">DV</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Route>
            <Nav className={`mr-auto plot`} navbar>
              <NavItem>
                <NF activeStyle={style} className="nav-link" to={"/"}>
                  Home
                </NF>
              </NavItem>
              <NavItem>
                {" "}
                <NF activeStyle={style} className="nav-link" to={"/timeline"}>
                  Timeline
                </NF>
              </NavItem>
              <NavItem>
                {" "}
                <NF
                  activeStyle={style}
                  className="nav-link"
                  to={"/summary-statistics"}
                >
                  Summary
                </NF>
              </NavItem>
              <NavItem>
                {" "}
                {auth.isLoggedIn ? (
                  <NF
                    activeStyle={style}
                    className="nav-link"
                    to={"/add-stats"}
                  >
                    Add Stats
                  </NF>
                ) : null}
              </NavItem>
              <NavItem>
                {" "}
                {auth.isLoggedIn ? (
                  <button className="btn yellow btn-sm">{auth.userName}</button>
                ) : null}
              </NavItem>
            </Nav>
          </Route>
        </Collapse>
      </Navbar>
    </HRouter>
  );
};

export default NavBar;
Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // pass in custom element to use
};
NavbarBrand.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // pass in custom element to use
};
