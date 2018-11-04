const Router = require('koa-router')();
const Auth = require('../../../lib/auth');
const Page = require('../../../lib/page');
Router.prefix('/api');

// Maps fields recursively with custom map function
function mapFields(arr, fn) {
  return arr.map(item => {
    if (item.fields && Array.isArray(item.fields)) {
      // Use assign to not overwrite original stuff
      item = Object.assign({}, item, {
        fields: item.fields.map(fn)
      });
    }
    return fn(item);
  });
}

// TODO: change Page.js to set fields to Array. And then when getting page then change fields to be an Object again
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
    fields: [],
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

// Add field scope
Router.get('/field/:page', Auth.middleware('pages.read'), async ctx => {
  const { page } = ctx.params;
  let body;

  if (Page.has(page)) {
    const data = Page.get(page);
    data.fields.map

    body = data.fields.map(field => {
      const { value: _, ...item } = field;
      return item;
    });
    ctx.status = 200;
  } else {
    ctx.status = 400;
    body = { message: 'Page not found' };
  }

  ctx.body = JSON.stringify(body);
});
Router.post('/field/:page', Auth.middleware('pages.update'), async ctx => {
  const { page } = ctx.params;
  let body;

  if (Page.has(page)) {
    const data = Page.get(page);
    body = mapFields(data.fields, item => {
      const { value: _, ...field } = item;
      return field;
    });
    ctx.status = 200;
  } else {
    ctx.status = 400;
    body = { message: 'Page not found' };
  }

  ctx.body = JSON.stringify(body);
});

module.exports = Router;
