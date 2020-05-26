import React, { useState } from "react";
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

  const toggle = () => setIsOpen(!isOpen);

  return (
    <HRouter>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">NTSA</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Route>
            <Nav className={`mr-auto plot`} navbar>
              <NavItem>
                <NF className="nav-link" to={"/"}>
                  Home
                </NF>
              </NavItem>
              <NavItem>
                {" "}
                <NF className="nav-link" to={"/pie-view"}>
                  Pie View
                </NF>
              </NavItem>
              <NavItem>
                {" "}
                <NF className="nav-link" to={"/line-view"}>
                  Line View
                </NF>
              </NavItem>
              <NavItem>
                {" "}
                <NF className="nav-link" to={"/add-stats"}>
                  Add Stats
                </NF>
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
