import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "../../UI/spinner/spinner";
import { signin, authenticate } from "../../core/auth/auth";
import "./SignIn.css";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    redirectToReferer: false,
    loading: false,
  };

  onChangeHandler = (inputName) => (event) => {
    this.setState({
      error: "",
      [inputName]: event.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { email, password } = this.state;
    const user = {
      email: email,
      password: password,
    };

    this.setState({
      success: false,
    });

    signin(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        //authenticate user
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  signinForm = (email, password) => (
    <form>
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
    const { email, password, error, redirectToReferer, loading } = this.state;

    if (redirectToReferer) {
      //go to home page
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className=" signin-form">
          {loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <div>
              <h2 className="mt-2 mb-5">SignIn</h2>
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
              {this.signinForm(email, password)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Signin;
