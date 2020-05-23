import React, { Component } from "react";
import { getUsersList } from "./apiUser";
import Spinner from "../UI/spinner/spinner";
import DefaultImage from "../img/avatar.png";
import { Link } from "react-router-dom";

import "./Users.css";

class Users extends Component {
  state = {
    users: [],
    loading: false,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  componentDidMount() {
    this.setState({ loading: true });
    getUsersList().then((data) => {
      if (data.error) {
        this.setState({ loading: false });
        console.log(data.error);
      } else {
        this.setState({ users: data, loading: false });
      }
    });
  }

  renderUsers = (users) => (
    <div className="row">
      {users.map((user, index) => (
        <div
          className="card col-md-3"
          key={index}
          style={{
            paddingTop: "15px",
            boxSizing: "border-box",
            backgroundColor: "#eeeeee",
            border: "1px solid #D8D8D8",
          }}
        >
          <div className="card-body">
            <img
              className="card-img-top"
              src={DefaultImage}
              alt={user.name}
              style={{
                width: "40%",
                height: "8vw",
                objectFit: "cover",
                backgroundSize: "cover",
                display: "inline-block",
                marginBottom: "1rem",
              }}
            />
            <h5 className="card-title">
              {this.capitalizeFirstLetter(user.name)}
            </h5>
            <p className="card-text">{user.email}</p>
            <Link to={`/user/${user._id}`} className="btn ">
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users, loading } = this.state;
    return (
      <>
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <div className="container users">
            <h2 className="mt-3 mb-3">Users</h2>
            {this.renderUsers(users)}
          </div>
        )}
      </>
    );
  }
}

export default Users;
