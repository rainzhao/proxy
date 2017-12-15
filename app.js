const koa = require("koa");
const Router = require('koa-router');
const app = new koa();
const router = new Router();
const proxy = require("./proxy");

app.use(async (ctx, next) => {
  console.log();
  if(ctx.request.method == "OPTIONS"){
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.set("Access-Control-Max-Age", 86400000);
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  }
  await next();
});

app.use(async (ctx,next) => {
  if(ctx.request.method == "OPTIONS"){
    async proxy("http://localhost:8080/api/queryRefundCondition", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: ctx.request.body
    })
  }
  await next();
})
app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3300,() => {
  console.log("listening on 3300");
});
