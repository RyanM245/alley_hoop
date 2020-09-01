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
  getPlayerGames: async (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    // console.log("HIT", req.params);
    const playerGames = await db.get_player_games(id);
    try {
      res.status(200).send(playerGames);
    } catch {
      res.status(500).send({ errorMessage: "We will get right on that!" });
      console.log(err);
    }
  },
  editGame: async (req, res, next) => {
    const { address, city, state_abbrev, date, time } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");

    const [game] = await db.edit_game({
      address,
      city,
      state_abbrev,
      date,
      time,
      game_id: id,
    });

    res.status(200).send(game);
  },
  deleteGame: async (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");

    const game = await db.delete_game([id]);

    res.status(200).send(game);
  },
};
