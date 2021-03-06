const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const user = await db.check_player(username);
    // console.log(user)
    if (!user[0]) {
      return res.status(401).send("Incorrect credentials");
    } else {
      const authenticated = bcrypt.compareSync(password, user[0].password);
      if (authenticated) {
        req.session.user = {
          playerId: user[0].player_id,
          username: user[0].username,
          email: user[0].email,
          pic: user[0].pic,
        };
        res.status(200).send(req.session.user);
      } else {
        res.status(403).send("Username or Password wrong");
      }
    }
  },
  register: async (req, res) => {
    // const propic = `https://alley-hoop.s3-us-west-1.amazonaws.com/ffba7e17-5487-4e92-9f69-54cc4b69afa2-download.png`
    const db = req.app.get("db");
    const transporter = req.app.get("transporter");
    const { username, password,email,pic } = req.body;
    const existingUser = await db.check_player(username);
    if (existingUser[0]) {
      return res.status(409).send("User already exists");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await db.create_player([username, hash,email, pic]);

    const mailOptions = {
      from: "ryan.test245@gmail.com",
      to: email,
      subject: "Nice Nodemailer test",
      text: "Hey there, it’s our first message sent with Nodemailer ;) ",
      html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent successfully!");
    });


    // console.log(newUser)
    req.session.user = {
      playerId: newUser[0].player_id,
      username: newUser[0].username,
      email: newUser[0].email,
      pic: newUser[0].pic,
    };
    res.status(200).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getPlayer: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(404).send(`Get Player`);
    }
  },
  edit: async (req, res) => {
    const { username, email, pic } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");

    const [player] = await db.edit_player({
      username,
      email,
      pic,
      player_id: id,
    });

    res.status(200).send(player);
  },
  pic: async (req,res) => {
    const {pic}= req.body;
    const {player_id} = req.session.user
    const db = req.app.get("db");

    await db.edit_pic({
      pic,
      player_id
    })
    req.session.user.pic = pic
    res.sendStatus(200)
  }
};
