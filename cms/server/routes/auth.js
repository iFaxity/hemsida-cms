
const Router = require('koa-router')();
const Auth = require('../auth');
Router.prefix('/auth');

// Request body parsing
const body = require('koa-body');
Router.use(body());

/*
  Authentication routes
*/
Router.post('/login', async ctx => {
  const { username, password } = ctx.request.body;

  try {
    const token = await Auth.login(username, password);
    ctx.body = { token };
    ctx.status = 200;
  } catch (ex) {
    ctx.body = { message: 'Ogiltiga inloggnings uppgifter' };
    ctx.status = 401;
  }
});
Router.post('/changePassword', Auth.middleware(), async ctx => {
  const { payload } = ctx.jwt;
  try {
    await Auth.changePassword(payload.user, newPassword);
    ctx.body = {
      token: ctx.jwt.create(),
    };
    ctx.status = 200;
  } catch (ex) {
    ctx.body = { message: ex.message };
    ctx.status = 400;
  }
});

// TODO: implement this (only allow admin roles)
Router.put('/create-user', Auth.middleware('accounts.create'), async ctx => {
  const { username, password, ...payload } = ctx.request.body;

  try {
    await Auth.createUser(username, password, payload);
    ctx.body = { ok: true };
    ctx.status = 200;
  } catch (ex) {
    ctx.body = { message: ex.message };
    ctx.status = 500;
  }
});

// 404 Route (just drop the request)
Router.all('*', async ctx => ctx.res.end());

module.exports = Router;
