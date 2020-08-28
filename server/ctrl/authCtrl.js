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
    const db = req.app.get("db");
    const { username, password,email, pic } = req.body;
    const existingUser = await db.check_player(username);
    if (existingUser[0]) {
      return res.status(409).send("User already exists");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await db.create_player([username, hash,email, pic]);
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
};
