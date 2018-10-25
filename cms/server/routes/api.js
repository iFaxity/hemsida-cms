const Router = require('koa-router')();
const Auth = require('../../../lib/auth');
const Page = require('../../../lib/page');
Router.prefix('/api');

/*
  API endpoints (maybe split them up to another file)
*/
Router.get('/page', Auth.middleware('pages.read'), async ctx => {
  const pages = Page.get();
  ctx.status = 200;
  ctx.body = JSON.stringify(pages);
});
Router.get('/page/:page', Auth.middleware('pages.read'), async ctx => {
  const { page } = ctx.params;

  const data = Page.get(page);
  ctx.status = 200;
  ctx.body = JSON.stringify(data);
});
Router.put('/page/:page', Auth.middleware('pages.create'), async ctx => {
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
Router.post('/page/:page', Auth.middleware('pages.update'), async ctx => {
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
Router.delete('/page/:page', Auth.middleware('pages.remove'), async ctx => {
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

module.exports = Router;
