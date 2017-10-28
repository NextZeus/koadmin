const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const render = require('koa-ejs');
const static = require('koa-static');
var cors = require('koa2-cors');
const path = require('path');
let session = require('koa-session2');



// init mongoose and redis
let mongo = require('./component/mongodb.js');
let redis = require('./component/redis.js');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json());
app.use(logger());

app.use(static(__dirname + '/templates'));

app.use(views(__dirname + '/views', {
  extension: 'ejs',
  cache:  false
}));

// Access Control
app.use(cors({
  origin: '*',
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept','X-Requested-With'],
}));

// let RedisStore = require('./component/redisStore');
// app.use(session({
//   store:  new RedisStore()
// }));

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
let monster2 = require('./controller/monster2/router');
app.use(monster2.routes(), monster2.allowedMethods());

/**
 * uncaughtException error handler
 */
process.on('uncaughtException', function (err) {
  console.error('uncaughtException error:',err);
  console.error(err.stack);
});

module.exports = app
