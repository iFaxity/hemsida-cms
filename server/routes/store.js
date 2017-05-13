const express = require("express");
const router = express.Router();

const LOCALS = {
  title: "Webbshop",
  main: "store"
};

/* GET admin page page. */
router.get("/", (req, res) => {
  res.render("store/index", LOCALS);
});

module.exports = router;
