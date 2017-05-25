const fs = require("fs");
const path = require("path");

const express = require("express");
const router = express.Router();

const Auth = require("../lib/auth");
const Cache = require("../lib/cache");

// Middleware for authentication
function requestAuth(req, res, next) {
  const { token } = req.session;

  Auth.auth(token).then(() => {
    // set user into request?
    //req.user = {};
    next();
  }, () => {
    if (req.method === "POST") {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    } else {
      res.redirect("/");
    }
  });
}

/* GET admin page page. */
router.get("/", (req, res) => {
  const { token } = req.session;
  const locals = { title: "Login" };

  if(!token) {
    res.render("cms/login", locals);
  } else {
    Auth.auth(token).then(() => {
      res.render("cms/index", {
        title: "Kontrollpanel",
        pages: Cache.get()
      });
    }, err => {
      // Some kind of error happened
      locals.messages = { error: err.message };
      res.render("cms/login", locals);
    });
  }
});


// Used to authenticate and logout the user
router.post("/auth", (req, res) => {
  const { username, password } = req.body;

  // Temporary user login system
  Auth.login(username, password).then(token => {
    req.session.token = token;
    res.redirect("/");
  }, err => {
    req.flash("error", err.message);
    res.redirect("/");
  });
});
router.get("/logout", (req, res) => {
  const { token } = req.session;
  
  // Destroy the login session
  const success = Auth.logout(token);
  req.session.destroy();
  res.redirect("/");
});

// Edit endpoints
router.get("/edit/:id", requestAuth, (req, res) => {
  const path = "/" + req.params.id;
  const data = Cache.get(path);

  res.render("cms/edit", {
    title: `Redigerar ${path}`,
    path, data
  });
});
router.post("/edit/:id", requestAuth, (req, res) => {
  const id = "/" + req.params.id;
  const { html } = req.body;

  Cache.set(id, html);
  res.status(200).end("OK");
});


module.exports = router;
