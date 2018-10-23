const Router = require('koa-router')();
Router.prefix('/cms');

const Auth = require('../lib/auth');
const Page = require('../lib/page');

/*
  API endpoints (maybe split them up to another file)
*/
Router.get('/api/page', Auth.middleware('page.read'), async ctx => {
  const pages = Page.get();
  ctx.status = 200;
  ctx.body = JSON.stringify(pages);
});
Router.get('/api/page/:page', Auth.middleware('page.read'), async ctx => {
  const { page } = ctx.params;

  const data = Page.get(page);
  ctx.status = 200;
  ctx.body = JSON.stringify(data);
});
Router.put('/api/page/:page', Auth.middleware('page.create'), async ctx => {
  const { data } = ctx.request.body;
  const { page } = ctx.params;
  let body;

  // Set default data
  Object.assign(data, {
    published: false,
    fields: {},
  });

  try {
    if(Page.has(page)) {
      ctx.body = { message: 'Sidan finns redan' };
      ctx.status = 401;
    } else {
      Page.set(page, data);
      ctx.body = { ok: true };
      ctx.status = 200;
    }
  } catch(ex) {
    body = { message: ex.message };
    ctx.status = 400;
  }
  ctx.body = JSON.stringify(body);
});
Router.post('/api/page/:page', Auth.middleware('page.update'), async ctx => {
  const { page } = ctx.params;
  const { data } = ctx.request.body;
  let body;

  if(Page.has(page)) {
    try {
      Page.set(page, data);
      body = { ok: true };
      ctx.status = 200;
    } catch(ex) {
      body = { message: ex.message };
      ctx.status = 500;
    }
  } else {
    body = { message: 'Sidan finns inte' };
    ctx.status = 401;
  }

  ctx.body = JSON.stringify(body);
});
Router.delete('/api/page/:page', Auth.middleware('page.remove'), async ctx => {
  const { page } = ctx.params;
  let body;

  try {
    await Page.remove(`/${page}`);
    ctx.body = { ok: true };
    ctx.status = 200;
  } catch(ex) {
    body = { message: ex.message };
    ctx.status = 400;
  }
  ctx.body = JSON.stringify(body);
});

/*
  Authentication routes
*/
Router.post('/auth/login', async ctx => {
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
Router.post('/auth/logout', Auth.middleware(), async ctx => {
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
Router.post('/auth/changePassword', Auth.middleware(), async ctx => {
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
Router.post('/auth/renewToken', Auth.middleware(), async ctx => {
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
Router.put('/auth/createUser', Auth.middleware('account.create'), async ctx => {
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

// Show cms page
Router.get('*', async ctx => {
  await ctx.render('cms/index');
});

module.exports = Router;
