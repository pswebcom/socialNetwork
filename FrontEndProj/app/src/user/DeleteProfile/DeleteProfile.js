import React, { Component } from "react";
import { isAuthenticated } from "../../core/auth/auth";
import { removeUserProfile } from "../apiUser";
import { signout } from "../../core/auth/auth";
import { Redirect } from "react-router-dom";
import Spinner from "../../UI/spinner/spinner";

export default class DeleteProfile extends Component {
  state = {
    redirect: false,
    loading: false,
  };

  deleteAccount = () => {
    this.setState({ loading: true });
    const token = `${isAuthenticated().token}`;
    const userId = this.props.userId;
    removeUserProfile(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        this.setState({ loading: false });
      } else {
        // signout
        signout(() => console.log("User signed out"));
        //redirect
        this.setState({ redirect: true, loading: false });
      }
    });
  };

  deleteConfirm = () => {
    let answer = window.confirm(
      "To Delete this account your confirmation is required"
    );
    if (answer) {
      this.deleteAccount();
    }
  };

  render() {
    const { redirect, loading } = this.state;
    if (redirect) {
      return <Redirect to="/signin" />;
    }

    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <button
            onClick={this.deleteConfirm}
            className="btn btn-raised btn-danger delete"
          >
            Delete Profile
          </button>
        )}
      </>
    );
  }
}
