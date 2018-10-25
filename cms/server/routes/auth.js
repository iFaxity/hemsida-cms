
const Router = require('koa-router')();
const Auth = require('../../../lib/auth');
Router.prefix('/auth');

/*
  Authentication routes
*/
Router.post('/login', async ctx => {
  const { username, password } = ctx.request.body;
  let body;

  // Temporary user login system...exchange for passport in the future
  try {
    body = await Auth.login(username, password);
    ctx.status = 200;
  } catch (ex) {
    body = { message: 'Ogiltiga inloggnings uppgifter' };
    ctx.status = 401;
  }

  ctx.body = JSON.stringify(body);
});
Router.post('/logout', Auth.middleware(), async ctx => {
  const { token } = ctx.request.body;
  let body;

  try {
    await Auth.logout(token);
    body = { ok: true };
    ctx.status = 200;
  } catch (ex) {
    body = { message: ex.message };
    ctx.status = 400;
  }

  ctx.body = JSON.stringify(body);
});
Router.post('/changePassword', Auth.middleware(), async ctx => {
  const { token, newPassword } = ctx.request.body;
  let body;

  try {
    await Auth.changePassword(token, newPassword);
    body = { ok: true };
    ctx.status = 200;
  } catch (ex) {
    body = { message: ex.message };
    ctx.status = 400;
  }

  ctx.body = JSON.stringify(body);
});
Router.post('/renewToken', Auth.middleware(), async ctx => {
  const { token } = ctx.request.body;
  let body;

  try {
    body = await Auth.renewToken(token);
    ctx.status = 200;
  } catch (ex) {
    body = { message: ex.message };
    ctx.status = 400;
  }

  ctx.body = JSON.stringify(body);
});
// TODO: implement this (only allow admin roles)
Router.put('/createUser', Auth.middleware('accounts.create'), async ctx => {
  let body;
  const { username, password, roles, name } = ctx.request.body;

  try {
    await Auth.createUser(username, password, {
      // Additional user info here (payload)
      name, roles
    });
    ctx.status = 200;
  } catch (ex) {
    body = { message: ex.message };
    ctx.status = 500;
  }

  if(body) {
    ctx.body = JSON.stringify(body);
  }
});

module.exports = Router;
