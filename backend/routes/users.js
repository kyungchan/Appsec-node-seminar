const tag = "users.js";

var express = require("express");
var router = express.Router();

const userModel = require("../odm/users");

router.patch("/:userId", (req, res) => {
  console.log(req.body);
  userModel
    .updateOne({ id: req.params.userId }, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

router.delete("/:userId", (req, res) => {
  userModel
    .deleteOne({
      id: req.params.userId,
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

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

module.exports = router;
