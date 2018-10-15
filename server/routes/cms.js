const Router = require("koa-router")();
Router.prefix("/cms");

const Auth = require("../lib/auth");
const Cache = require("../lib/cache");

/*
  API endpoints (maybe split them up to another file)
*/
Router.get("/api/pages", Auth.middleware, async ctx => {
  const pages = Cache.get();
  ctx.status = 200;
  ctx.body = JSON.stringify(pages);
});
Router.delete("/api/pages/:page", Auth.middleware, async ctx => {
  const { page } = ctx.params;
  const res = Cache.remove(`/${page}`);
  ctx.body = `{"ok": ${res}}`;
});
Router.get("/api/edit/:page", Auth.middleware, async ctx => {
  const { token } = ctx.request.body;
  const { page } = ctx.params;
  let body;

  const data = Cache.get(page);
  ctx.status = 200;
  ctx.body = JSON.stringify(data);
});
Router.post("/api/edit/:page", Auth.middleware, async ctx => {
  const { data } = ctx.request.body;
  const { page } = ctx.params;
  Cache.set(page, JSON.stringify(data));
  ctx.body = `{"ok": true}`;
});

/*
  Authentication routes (maybe use a framework instead)
*/
Router.post("/auth/login", async ctx => {
  const { username, password } = ctx.request.body;
  let body;

  // Temporary user login system...exchange for passport in the future
  try {
    body = await Auth.login(username, password);
    ctx.status = 200;
  } catch (ex) {
    body = { header: "Verifieringsfel", message: ex.message };
    ctx.status = 400;
  }

  ctx.body = JSON.stringify(body);
});
Router.post("/auth/logout", async ctx => {
  const { token } = ctx.request.body;
  let body;

  try {
    await Auth.logout(token);
    body = {ok: true};
    ctx.status = 200;
  } catch (ex) {
    body = { header: "Verifieringsfel", message: ex.message };
    ctx.status = 400;
  }

  ctx.body = JSON.stringify(body);
});
Router.post("/auth/changePassword", async ctx => {
  const { token, newPassword } = ctx.request.body;
  let body;

  try {
    await Auth.changePassword(token, newPassword);
    body = { ok: true };
    ctx.status = 200;
  } catch (ex) {
    body = { header: "Invalid token", message: ex.message };
    ctx.status = 400;
  }

  ctx.body = JSON.stringify(body);
});
Router.post("/auth/renewToken", async ctx => {
  const { token } = ctx.request.body;
  let body;

  try {
    body = await Auth.renewToken(token);
    ctx.status = 200;
  } catch (ex) {
    body = { header: "Invalid token", message: ex.message };
    ctx.status = 400;
  }

  ctx.body = JSON.stringify(body);
});
// TODO: implement this (only allow localhost)
Router.put("/auth/createUser", async ctx => {
  ctx.status = 500;
  ctx.body = JSON.stringify({ message: "Unknown error happened" });

  /*
  const {username, password} = ctx.request.body;

  try {
    await Auth.createUser(username, password, {
      // Additional user info here (payload)
      name: "",
      email: ""
    });
    ctx.status = 200;
  } catch (ex) {
    const body = { header: "Kunde inte skapa konto.", message: ex.message };
    ctx.status = 400;
    ctx.body = JSON.stringify(body);
  }*/
});

/* 
  GET admin page page.
  Or render a 404?
*/
Router.get("*", async ctx => {
  await ctx.render("cms/index");
});

module.exports = Router;
