module.exports = {
  getAll: async (req, res) => {
    const db = req.app.get("db");
    const games = await db.get_games();
    res.status(200).send(games);
  },
  create: (req, res, next) => {
    const db = req.app.get("db");
    const { address, city, state_abbrev, date, time } = req.body;

    db.create_product([address, city, state_abbrev, date, time])
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.status(500).send({ errorMessage: "We will get right on that!" });
        console.log(err);
      });
  },
};
