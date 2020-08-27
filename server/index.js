require("dotenv").config();
const massive = require("massive");
const express = require("express");
const app = express();
const session = require("express-session");

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;
const ctrl = require("./ctrl/ctrl");
const authCtrl = require("./ctrl/authCtrl");

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: SESSION_SECRET,
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((db) => {
    app.set("db", db);
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));

//-------Auth-------
app.post("/auth/login", authCtrl.login);
app.post("/auth/register", authCtrl.register);
app.get("/auth/logout", authCtrl.logout);
app.get("/auth/player", authCtrl.getPlayer);
//---------Games-------
app.get("/games/getall", ctrl.getAll);
app.post("/games/create", ctrl.create);

app.listen(SERVER_PORT, () => console.log(`Connected to port ${SERVER_PORT}`));
