const mongoose = require("mongoose");
require("dotenv").config();

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGO);
    console.log("data base connected ");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connect_db;
