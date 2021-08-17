const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class Controller {
  static postRegister(req, res) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then((data) => res.send({ id: data.id, email: data.email }))
      .catch((err) => console.log(err));
  }

  static postLogin(req, res) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            const access_token = jwt.sign(
              { id: user.id, email: user.email },
              "rahasia"
            );
            res.send(access_token);
          } else {
            res.send({ message: "invalid email/password" });
          }
        } else {
          res.send({ message: "invalid email/password" });
        }
      })
      .catch((err) => res.send(err));
  }

  static getUser(req, res) {
    let id = +req.params.id;
    User.findByPk(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => console.log(err, `ini error <<<<<<<<<<<<<`));
  }
};
