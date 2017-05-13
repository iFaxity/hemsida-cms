const fs = require("fs");
const path = require("path");

const express = require("express");
const router = express.Router();

const Cache = require("../lib/cache");
const PAGES_DIR = path.join(__dirname, "../pages");


router.get("/test", (req, res, next) => {
  res.render("test");
});

router.post("/test/endpoint", (req, res, next) => {
  const { message } = req.body;

  if(message) {
    res.status(200).end(message);
  } else {
    res.status(400).end("Shit just got real fucked!");
  }
});

// Render template and append page content from pages/<filename>.html
router.get("/*", (req, res, next) => {
  const renderErr = (status, message) => res.render("error", { message, err: { status } });
  const url = req.url.substr(1);

  let file;
  if (url === "") {
    file = "index";
  } else {
    // Replace every / with a .
    file = url.replace("/\//g", ".");
  }

  Cache.get(file + ".html").then(data => {
    res.render("index", {
      title: "Lekextra",
      content: data
    });
  }, next);
});

module.exports = router;
