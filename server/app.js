 require("dotenv").config();
const express = require("express");
const connect_db = require("./utils/connection");
const app = express();

const cors = require("cors");

// cors policy
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
// import routes and use it
app.use("/api", require("./routes/Auth"));

// create the server
async function start_server() {
  await connect_db();
  try {
    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

start_server();
