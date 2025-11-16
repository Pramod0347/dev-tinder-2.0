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
const validateEditProfileData = (req) => {
  const allowedFields = ["firstName", "lastName", "emailId", "photoURL", "gender", "age", "skills", "about"];
  
  // Check that ALL fields in req.body are in the allowedFields list
  const isValidated = Object.keys(req.body).every((field) => {
    return allowedFields.includes(field);
  });
  
  // If any field is NOT allowed, return false
  if (!isValidated) {
    return false;
  }
  
  // All fields are allowed
  return true;
}


module.exports = { validateSignUpData, validateEditProfileData };
