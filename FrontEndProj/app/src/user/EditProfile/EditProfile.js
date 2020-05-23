import React, { Component } from "react";
import Spinner from "../../UI/spinner/spinner";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../../core/auth/auth";
import { getUserProfile } from "../apiUser";
import { updateUserProfile } from "../apiUser";
import "./EditProfile.css";

export default class EditProfile extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    password: "",
    redirectToProfile: false,
    loading: false,
    error: "",
    loading: false,
  };

  init = (userId) => {
    const token = `${isAuthenticated().token}`;
    getUserProfile(userId, token).then((data) => {
      if (data.error) {
        // ..REDIRECT TO SOME OTHER PAGE
        this.setState({ redirectToProfile: true, loading: false });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          loading: false,
        });
      }
    });
  };

  componentDidMount() {
    this.userData = new FormData();
    this.setState({ loading: false });
    const userId = this.props.match.params.userid;
    this.init(userId);
  }

  isValid() {
    const { name, email, password } = this.state;
    if (name.length === 0) {
      this.setState({ error: "Name is required" });
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "A valid Email is required",
        loading: false,
      });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({ error: "Password of minmum 6 characters is required" });
      return false;
    }
    return true;
  }

  onChangeHandler = (inputName) => (event) => {
    const value =
      inputName === "photo" ? event.target.files[0] : event.target.value;

    this.userData.set(inputName, value);

    this.setState({
      [inputName]: value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      //update method
      const userId = this.props.match.params.userid;
      const token = `${isAuthenticated().token}`;
      updateUserProfile(userId, token, this.userData)
        .then((data) => {
          if (data.error) {
            this.setState({ error: data.error, loading: false });
          } else {
            this.setState({ redirectToProfile: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  signupForm = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={this.onChangeHandler("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.onChangeHandler("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.onChangeHandler("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Profile Image</label>
        <input
          type="file"
          className="form-control-file"
          id="exampleInputFile"
          accept="image/*"
          onChange={this.onChangeHandler("photo")}
        />
      </div>
      <button
        onClick={this.onSubmitHandler}
        className="btn btn-raised btn-primary"
      >
        Update Profile
      </button>
    </form>
  );

  render() {
    const {
      id,
      name,
      email,
      password,
      loading,
      redirectToProfile,
      error,
    } = this.state;

    if (redirectToProfile) {
      //RETURN TO PROFILE COMPONENT
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div className="container edit">
        <div className=" signup-form">
          {loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <div>
              <h2 className="mt-2 mb-5">Edit Profile</h2>
              {
                <div
                  className="alert alert-danger"
                  style={{ display: error ? "" : "none" }}
                >
                  {error}
                </div>
              }

              {this.signupForm(name, email, password)}
            </div>
          )}
        </div>
      </div>
    );
  }
}
