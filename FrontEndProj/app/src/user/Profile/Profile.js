import React, { Component } from "react";
import { isAuthenticated } from "../../core/auth/auth";
import { Redirect, Link } from "react-router-dom";
import { getUserProfile } from "../apiUser";
import Spinner from "../../UI/spinner/spinner";
import DefaultImage from "../../img/avatar.png";
import DeleteProfile from "../DeleteProfile/DeleteProfile";
import "./Profile.css";

export default class Profile extends Component {
  state = {
    user: "",
    redirectToSignIn: false,
    loading: false,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  init = (userId) => {
    const token = `${isAuthenticated().token}`;
    getUserProfile(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToSignIn: true, loading: false });
      } else {
        this.setState({ user: data, loading: false });
      }
    });
  };

  componentDidMount() {
    this.setState({ loading: true });
    const userId = this.props.match.params.userid;
    this.init(userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ loading: true });
      const userId = this.props.match.params.userid;
      this.init(userId);
    }
  }

  render() {
    const { redirectToSignIn, user, loading } = this.state;
    //go to signin page
    if (redirectToSignIn) return <Redirect to="/signin" />;

    return (
      <>
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <div className="container profile">
            <h2 className="mt-3 mb-3"></h2>
            <div
              className="  text-muted   mb-3"
              style={{
                maxWidth: "45rem",
                margin: "0 auto",
                backgroundColor: "#eeeeee",
              }}
            >
              <div
                className="card-header"
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                <h3>Profile</h3>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="card-body" style={{ paddingBottom: "none" }}>
                    <img
                      className="card-img-top"
                      src={DefaultImage}
                      alt={user.name}
                      style={{
                        width: "100%",
                        height: "11vw",
                        objectFit: "cover",
                        backgroundSize: "cover",
                        display: "inline-block",
                        marginBottom: "none",
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-8 card-desc">
                  <h5 className="card-title">
                    <strong>Name</strong>:{" "}
                    {user.name ? this.capitalizeFirstLetter(user.name) : ""}
                  </h5>
                  <h5 className="card-title">
                    <strong>Email</strong>: {user.email}
                  </h5>
                  <h5 className="card-title">
                    <strong>Joined</strong>
                    {`: ${new Date(this.state.user.created).toDateString()}`}
                  </h5>
                  {isAuthenticated().user &&
                  isAuthenticated().user._id === user._id ? (
                    <div className="d-inline mt-5">
                      <Link
                        className="btn btn-raised btn-success mr-2"
                        to={`/users`}
                      >
                        Back To Users
                      </Link>
                      <Link
                        className="btn btn-raised btn-success mr-2"
                        to={`/user/edit/${user._id}`}
                      >
                        Edit Profile
                      </Link>
                      <DeleteProfile className="btn" userId={user._id} />
                    </div>
                  ) : (
                    <div className="btn-profile">
                      <Link
                        className="btn btn-raised btn-success"
                        to={`/users`}
                      >
                        Back To Users
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
