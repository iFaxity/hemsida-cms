const path = require('path');
const etag = require('koa-etag');
const conditional = require('koa-conditional-get');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const compress = require('koa-compress');
const static = require('koa-static');
const mount = require('koa-mount');
const views = require('./views');
const { color, COLORS } = require('../lib/colors');

const Koa = require('koa');
const app = new Koa();
const route = require('./route');
const VIEWS_DIR = path.join(__dirname, '/views');
const STATIC_DIR = path.join(__dirname, '/client');

// Add etag support and use helmet for security
app.use(conditional());
app.use(etag());
app.use(helmet());

app.use(logger());
app.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH
}));
app.use(views(VIEWS_DIR, { ext: 'pug' }));
app.use(mount('/client', static(STATIC_DIR)));
app.use(route);

// Indicate that the server started
console.log(color(COLORS.green, 'Server is now running!'));
module.exports = app;
