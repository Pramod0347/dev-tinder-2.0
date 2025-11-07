const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pgoudar347:mCiwsGS2zjCESvmN@taskflow-project.l6zrkzs.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

