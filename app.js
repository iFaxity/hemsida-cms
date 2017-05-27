const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");

const flash = require("./server/lib/flash");
const subdomain = require("./server/lib/subdomain");

// Routes
const index = require("./server/routes/index");
const cms = require("./server/routes/cms");
const book = require("./server/routes/book");
const store = require("./server/routes/store");

// Initialize express app
const app = express();
const isProduction = app.get("env") === "prodution";

// view engine setup
app.set("views", path.join(__dirname, "server/views"));
app.set("view engine", "pug");
app.set("trust proxy", 1); // trust first proxy

// uncomment after placing your favicon in /client
//app.use(favicon(path.join(__dirname, "client", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client")));
app.use(session({
  secret: "somesecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
    maxAge: 24*60*60*1000 // expire in 1 day
  }
}));

// Add custom middleware
//subdomain.add({ base: index, cms, book, store });
subdomain.add({base: cms});
app.use(flash);
app.use(subdomain);



// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found: " + req.url);
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // render the error page
  if(!err.status) {
    err.status = 500;
  }
  res.status(err.status);

  res.render("error", {
    message: err.message,
    error: !isProduction ? err : {}
  });
});

// Indicate that the server started
console.log("\x1b[32m%s\x1b[0m", "Server is now running!");
module.exports = app;
