exports.createPostValidator = (req, res, next) => {
  req.check("title", "Provide a title").notEmpty();
  req.check("title", "Title Must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150,
  });

  req.check("description", "Write a description").notEmpty();
  req
    .check("description", "Description Must be between 4 to 2000 characters")
    .isLength({
      min: 4,
      max: 2000,
    });

  //check for all errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0]; //give 1st error from array
    return res.status(400).json({ error: firstError });
  }
  next(); //proceed to next middleware
};

exports.userSignupValidator = (req, res, next) => {
  //name is not null & between 4 to 10 characters
  req.check("name", "Name is required").notEmpty();
  //email is not null ..valid & normalized
  // req.check("email", "Email is required").notEmpty();
  req
    .check("email", "Email is required")
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({ min: 4, max: 2000 });

  //check for password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");

  //check for all errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0]; //give 1st error from array
    return res.status(400).json({ error: firstError });
  }
  next(); //proceed to next middleware
};
