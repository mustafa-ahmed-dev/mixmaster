import { NavLink } from "react-router-dom";

import { routes } from "./../router";
import NavWrapper from "./../assets/wrappers/Navbar.js";

const Navbar = () => {
  return (
    <NavWrapper>
      <div className="nav-center">
        <span className="logo">MixMaster</span>

        <div className="nav-links">
          <NavLink to={routes.landing.path} className="nav-link">
            {routes.landing.name}
          </NavLink>

          <NavLink to={routes.about.path} className="nav-link">
            {routes.about.name}
          </NavLink>

          <NavLink to={routes.newsletter.path} className="nav-link">
            {routes.newsletter.name}
          </NavLink>
        </div>
      </div>
    </NavWrapper>
  );
};

export default Navbar;
