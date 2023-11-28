
const databaseUsers = require("../../database");

const getUsers = (req, res) => {
  databaseUsers
    .query("select * from users")
    .then(([users]) => {
      res.status(200).json(users); // use res.json instead of console.log
      console.log(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  databaseUsers
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
};
const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  databaseUsers
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  databaseUsers
    .query(
      "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [ firstname, lastname, email, city, language , id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404);
      } else {
        res.status(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser

};
