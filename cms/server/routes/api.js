const path = require('path');
const fs = require('mz/fs');
const send = require('koa-send');
const body = require('koa-body');
const Router = require('koa-router')();

const Auth = require('../auth');
const Page = require('../../../lib/page');

Router.prefix('/api');

// Request body parsing & file uploads
Router.use(body({ multipart: true }));

// TODO: change Page.js to set fields to Array. And then when getting page then change fields to be an Object again
/*
  API endpoints (maybe split them up to another file)
*/
Router.get('/page', Auth.middleware('pages.read'), async ctx => {
  ctx.status = 200;
  ctx.body = { data: Page.get() };
});
Router.get('/page/:page', Auth.middleware('pages.read'), async ctx => {
  const { page } = ctx.params;

  const { value: _, ...data } = Page.get(page);
  ctx.status = 200;
  ctx.body = { data };
});
Router.put('/page/:page', Auth.middleware('pages.create'), async ctx => {
  const { data } = ctx.request.body;
  const { page } = ctx.params;

  // Set default data
  Object.assign(data, {
    title: '',
    description: '',
    published: false,
    fields: [],
  });

  try {
    if(!Page.has(page)) {
      Page.set(page, data);
      ctx.status = 200;
      ctx.body = {};
    } else {
      ctx.status = 401;
      ctx.body = { message: 'Sidan finns redan' };
    }
  } catch(ex) {
    ctx.status = 400;
    ctx.body = { message: ex.message };
  }
});
Router.post('/page/:page', Auth.middleware('pages.update'), async ctx => {
  const { page } = ctx.params;
  const { data } = ctx.request.body;

  if(Page.has(page)) {
    try {
      Page.set(page, data);
      ctx.status = 200;
      ctx.body = {};
    } catch(ex) {
      ctx.status = 500;
      ctx.body = { message: ex.message };
    }
  } else {
    ctx.body = { message: 'Sidan finns inte' };
    ctx.status = 401;
  }
});
Router.delete('/page/:page', Auth.middleware('pages.remove'), async ctx => {
  const { page } = ctx.params;

  try {
    await Page.remove(page);
    ctx.status = 200;
    ctx.body = {};
  } catch(ex) {
    ctx.status = 400;
    ctx.body = { message: ex.message };
  }
});

// Add field scope
Router.get('/field/:page', Auth.middleware('pages.read'), async ctx => {
  const { page } = ctx.params;

  if (Page.has(page)) {
    const pageData = Page.get(page);

    const data = pageData.fields.map(field => {
      const { value: _, ...item } = field;
      return item;
    });

    ctx.status = 200;
    ctx.body = { data };
  } else {
    ctx.status = 400;
    ctx.body = { message: 'Page not found' };
  }
});
Router.post('/field/:page', Auth.middleware('pages.update'), async ctx => {
  const { page } = ctx.params;
  const { data } = ctx.request.body;

  if (Page.has(page)) {
    try {
      Page.set(page, data);
      ctx.status = 200;
      ctx.body = {};
    } catch (ex) {
      ctx.status = 500;
      ctx.body = { message: ex.message };
    }
  } else {
    ctx.status = 400;
    ctx.body = { message: 'Page not found' };
  }
});

// File upload
/*const MEDIA_PATH = path.join(__dirname, '../../../www', process.env.MEDIA_DIR);

Router.put('/files/add', Auth.middleware('pages.update'), async ctx => {
  const { image } = ctx.request.files;

  // image.path = local temp path of file
  // image.name = name of file
  // image.type = mime type

  // move the file to the img folder of www
  const filename = Date.now() + path.extname(image.name);

  // Move file from temp to media folder
  await fs.rename(image.path, path.join(MEDIA_PATH, filename));

  const data = {
    path: filename,
  };
  ctx.status = 200;
  ctx.body = { data };
});
Router.get('/files/:file', async ctx => {
  try {
    await send(ctx, ctx.params.file, {
      root: MEDIA_PATH
    });
  } catch(ex) {
    console.error(ex);
    ctx.throw(500, ex);
  }
});*/

// 404 Route (just drop the request)
Router.all('*', async ctx => ctx.res.end());

module.exports = Router;
