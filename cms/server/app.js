const path = require('path');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const compress = require('koa-compress');
const static = require('koa-static');
const mount = require('koa-mount');

//const json = require('./json');
const { color, COLORS } = require('../../lib/colors');
const STATIC_DIR = path.join(__dirname, '../dist');

const Koa = require('koa');
const app = new Koa();
const auth = require('./routes/api');
const api = require('./routes/auth');
const cms = require('./routes/cms');

// Add etag support and use helmet for security
app.use(conditional());
app.use(etag());
app.use(helmet());
//app.use(json({ pretty: true }));

// uncomment after placing your favicon in /client
//app.use(favicon(__dirname + '/client/favicon.ico'));
app.use(logger());
app.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH
}));

// Mount the routes and static content
app.use(mount('/dist', static(STATIC_DIR)));
app.use(api.routes());
app.use(auth.routes());
app.use(cms);

// Indicate that the server started
console.log(color(COLORS.green, 'Server is now running!'));
module.exports = app;
