const tag = "[dbconnect.js]";
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

module.exports = () => {
  function connect() {
    mongoose.set("useCreateIndex", true);
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(tag, "Mongodb Connected");
      })
      .catch((err) => {
        console.log(tag, "MongoDB error: ", err);
      });
  }
  connect();
};
