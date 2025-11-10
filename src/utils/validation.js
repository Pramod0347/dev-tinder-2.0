const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !emailId || !password) {
    throw new Error("firstName, emailId and password are required fields");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  }
};

module.exports = { validateSignUpData };
