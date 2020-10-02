const tag = "users.js";

var express = require("express");
var router = express.Router();

const userModel = require("../odm/users");
router.post("/", (req, res) => {
  userModel
    .create(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

router.get("/", (req, res) => {
  userModel
    .find({}, { password: 0 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(400);
    });
});

router.patch("/:userId", (req, res) => {
  userModel
    .updateOne({ id: req.params.userId }, req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

router.get("/:userId", (req, res) => {
  userModel
    .create(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

module.exports = router;
