const {createReadStream} = require('fs');
const Router = require('koa-router');
const HelloController = require("./controllers/HelloController");
const {login, getUser} = require("./controllers/AuthController");
const ObjectController = require("./controllers/ObjectController");
const {getSessionKeyAndOpenID} = require("./helpers/WeChat");

const router = new Router();

//hello world
router.get("/", (ctx) => HelloController.sayHelloWorld(ctx));

router.post("/login", login);
router.get("/getuser", getUser);

router.post("/code2id", async (ctx) => {
  const code = ctx.request.body.code;
  const res = await getSessionKeyAndOpenID(code);
  ctx.body = res || {error: "Getting id fails."}
});


//socket debug
router.get("/s", async (ctx) => {
  ctx.type = 'html';
  ctx.body = createReadStream('./socket.html');
});

//lost and found objects
const objects = new Router();
objects.post("/", ObjectController.publishNewObject);
objects.get("/", ObjectController.getAllObjects);
objects.post("/toggleObjectState", ObjectController.toggleObjectState);


router.use("/objects", objects.routes(), objects.allowedMethods());

module.exports = router;