export const getUserProfile = (userId, token) => {
  return fetch(`http://localhost:8080/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeUserProfile = (userId, token) => {
  return fetch(`http://localhost:8080/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUsersList = () => {
  return fetch("http://localhost:8080/users", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateUserProfile = (userId, token, user) => {
  console.log("-------------", user);
  return fetch(`http://localhost:8080/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      // now we dont need this as we r sending form data and not json
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // now we dont need to stringify as we r sending form data and not json
    // body: JSON.stringify(user),
    body: user,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
