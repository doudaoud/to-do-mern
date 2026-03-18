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
  try {
    await connect_db();
    app.listen(process.env.PORT, () => {
      console.log(`Serveur démarré : http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Erreur au démarrage du serveur :", err);
    process.exit(1);
  }
}

start_server();
