require("dotenv").config();
const massive = require("massive");
const express = require("express");
const app = express();
const session = require("express-session");

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, PASSWORD, EMAIL } = process.env;
const ctrl = require("./ctrl/ctrl");
const authCtrl = require("./ctrl/authCtrl");
const S3Ctrl = require('./ctrl/S3Ctrl')
const nodemailer = require('nodemailer')

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: EMAIL,
         pass: PASSWORD
     }
 });

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
    app.set("transporter", transporter)
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));

//-------Auth-------
app.post("/auth/login", authCtrl.login);
app.post("/auth/register", authCtrl.register);
app.get("/auth/logout", authCtrl.logout);
app.get("/auth/player", authCtrl.getPlayer);
app.put("/auth/player/:id", authCtrl.edit);
//---------Games-------
app.get("/games/getall", ctrl.getAll);
app.post("/games/create", ctrl.create);
app.get("/games/playergames/:id", ctrl.getPlayerGames);
app.put("/games/player/:id", ctrl.editGame);
app.delete("/games/player/:id", ctrl.deleteGame);
//------------S3-------------
app.get('/api/signs3', S3Ctrl.sign_s3);
app.post('/player/pic',authCtrl.pic )

app.listen(SERVER_PORT, () => console.log(`Connected to port ${SERVER_PORT}`));
