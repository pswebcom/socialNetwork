import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/auth";
import "./Menu.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#ffffff" };
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase();
};

//these props r coming from withRouter providing history object
const Menu = ({ history }) => {
  return (
    <div className="menu">
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-none "
          style={{ position: "relative", backgroundColor: "#32408f" }}
        >
          <div className="container">
            <a className="navbar-brand" href="#">
              <span
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Social Network
              </span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              style={{ marginLeft: "550px" }}
              id="navbarNav"
            >
              <ul className="navbar-nav">
                {isAuthenticated() && (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/"
                        className="nav-link"
                        style={isActive(history, "/")}
                      >
                        <span className="">Home</span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/users"
                        className="nav-link"
                        style={isActive(history, "/users")}
                      >
                        <span className="">Users</span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to={`/user/${isAuthenticated().user._id}`}
                        className="nav-link"
                        style={isActive(
                          history,
                          `/user/${isAuthenticated().user._id}`
                        )}
                      >
                        <span className="name">
                          {`${isAuthenticated().user.name}'s Profile`}
                        </span>
                      </Link>
                    </li>
                  </>
                )}

                {!isAuthenticated() && (
                  <React.Fragment>
                    <li className="nav-item">
                      <Link
                        to="/signup"
                        className="nav-link"
                        style={isActive(history, "/signup")}
                      >
                        <span className="">Sign Up</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/signin"
                        className="nav-link"
                        style={isActive(history, "/signin")}
                      >
                        <span className="">Sign In</span>
                      </Link>
                    </li>
                  </React.Fragment>
                )}
              </ul>

              {isAuthenticated() && (
                <div className="options">
                  <span className="option-name">
                    {`${capitalizeFirstLetter(isAuthenticated().user.name)}`}
                  </span>
                  <div className="option-name-div">
                    <div className="invisible">invisible</div>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <Link to="/" className="link">
                          <span className="span-logout">Notifications</span>
                        </Link>
                      </li>
                      <li className="list-group-item">
                        <Link to="/signup" className="link">
                          <span className="span-logout">Messages</span>
                        </Link>
                      </li>
                      <li className="list-group-item">
                        <Link to="/signup" className="link">
                          <span className="span-logout">Settings</span>
                        </Link>
                      </li>
                      <li className="list-group-item">
                        <Link to="/" className="link">
                          <span className="span-logout">Help</span>
                        </Link>
                      </li>
                      <li className="list-group-item">
                        <a className="link" href="#">
                          <span
                            className="span-logout"
                            // passing a function into signout function will be recievd as next
                            onClick={() =>
                              signout(() => history.push("/signin"))
                            }
                          >
                            Log Out
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default withRouter(Menu);
