import React from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../helper";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Header = () => {
  const history = useHistory();

  return (
    <>
      <div className="header_container">
        <div className="header_left">
          <Link to="/" className="navoption">
            <h1>csv coverter</h1>
          </Link>
        </div>
        <div className="header_right">
          <Link
            to="#"
            className="navoption"
            onClick={() => {
              logout(() => {
                history.push("/login");
              });
            }}
          >
            <h3>
              <ExitToAppIcon />
            </h3>
            <h3>Logout</h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
