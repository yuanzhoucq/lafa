const Koa = require('koa');
const router = require('./route');
const serve = require('koa-static');
const BodyParser = require('koa-bodyparser');
const Config = require("../config");

const app = new Koa();

app.use(BodyParser());
app.use(router.routes());
app.use(serve('../build'));

app.listen(Config.server.port);
console.log(`Server started listening at ${Config.server.port}...`);
