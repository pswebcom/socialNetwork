//signup
export const signup = (user) => {
  return fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};

//signin
export const signin = (user) => {
  return fetch("http://localhost:8080/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};

//authenticate
export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

//signout
export const signout = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
  return fetch("http://localhost:8080/signout", {
    method: "GET",
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//isAuthenticated
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
