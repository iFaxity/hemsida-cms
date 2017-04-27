const express = require("express");
const router = express.Router();
const takenDays = {};
const LOCALS = {
  title: "Booking system",
  main: "/javascripts/book"
};

/* GET home page. */
router.get("/", (req, res) => {
  res.render("book/index", LOCALS);
});

router.post("/add", (req, res) => {
  // Check if date is available and book it

  if(true) {
    res.status(200).end("Success");
    return;
  }

  res.status(400).end("Bad Request");
});

module.exports = router;
