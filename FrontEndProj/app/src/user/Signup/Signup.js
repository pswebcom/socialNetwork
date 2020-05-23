import React, { Component } from "react";
import "./Signup.css";
import Spinner from "../../UI/spinner/spinner";
import { signup } from "../../core/auth/auth";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  };

  onChangeHandler = (inputName) => (event) => {
    this.setState({
      error: "",
      success: false,
      [inputName]: event.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { name, email, password } = this.state;
    const user = {
      name: name,
      email: email,
      password: password,
    };
    this.setState({
      success: false,
    });
    signup(user).then((data) => {
      if (data.error) this.setState({ error: data.error, loading: false });
      else
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          success: true,
          loading: false,
        });
    });
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
      <button
        onClick={this.onSubmitHandler}
        className="btn btn-raised btn-primary"
      >
        Submit
      </button>
    </form>
  );

  render() {
    const { name, email, password, error, success, loading } = this.state;

    return (
      <div className="container">
        <div className=" signup-form">
          {loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <div>
              <h2 className="mt-2 mb-5">SignUp</h2>
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
              <div
                className="alert alert-primary"
                style={{ display: success ? "" : "none" }}
              >
                You have signed up successfully. Please{" "}
                <Link to="/signin">SignIn</Link>
              </div>
              {this.signupForm(name, email, password)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Signup;
