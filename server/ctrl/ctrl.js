module.exports = {
  getAll: async (req, res) => {
    const db = req.app.get("db");
    const games = await db.get_games();
    res.status(200).send(games);
  },
  create: (req, res, next) => {
    const db = req.app.get("db");
    const { address, city, state_abbrev, date, time } = req.body;
    const { playerId } = req.session.user;
    // console.log(req.session)
    db.create_game([playerId, address, city, state_abbrev, date, time])
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.status(500).send({ errorMessage: "We will get right on that!" });
        console.log(err);
      });
  },
  getPlayerGames: (req, res, next) => {
    const db = req.app.get("db");
    const { playerId } = req.params;
    db.get_player_games(playerId)
      .then((playerGames) => res.status(200).send(playerGames))
      .catch((err) => {
        res.status(500).send({ errorMessage: "We will get right on that!" });
        console.log(err);
      });
  },
};
