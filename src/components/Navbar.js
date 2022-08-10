import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();
  const handleclick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Notes
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" && "active"
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" && "active"
                  }`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/theme" && "active"
                  }`}
                  aria-current="page"
                  to="/theme"
                >
                  Select Theme
                </Link>
              </li>
            </ul>
          </div>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">
                signup
              </Link>
            </form>
          ) : (
            <button className="btn btn-primary" onClick={handleclick}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
