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

  if(!token) {
    res.render("cms/index");
  }
  else {
    Auth.auth(token).then(() => {
      const locals = {
        title: "CMS System",
        main: "cms",
        pages: Cache.getAll
      };

      res.render("cms/index", locals);
    }, err => {
      // Some kind of error happened
      res.render("cms/login", {
        title: "CMS Login",
        messages: {
          error: err.message
        }
      });
    });
  }
});


// Used to authenticate and logout the user
router.post("/auth", (req, res) => {
  const { user, password } = req.body;

  // Temporary user login system
  Auth.login(user, password).then(token => {
    req.session.token = token;
    res.redirect("/");
  }, err => {
    req.flash("error", err.message);
    res.redirect("/");
  });
});
router.get("/logout", (req, res) => {
  const { token } = req.session;
  
  // Logout token
  const success = Auth.logout(token);
  res.redirect("/");
});


// Edit endpoints
router.post("/edit/:id", requestAuth, (req, res) => {
  const { id } = req.params;
  const { html } = req.body;

  fs.writeFile(path.join(__dirname, `../pages/${id}.html`), html, err => {
    if(err) {
      console.error(err);
      res.status(401).end(`Unauthorized`);
    } else {
      res.status(200).end("OK. id: " + id);
    }
  });
});


module.exports = router;
