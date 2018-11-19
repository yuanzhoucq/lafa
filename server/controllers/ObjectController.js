const ObjectModel = require("../models/ObjectModel");

const BaseController = require('./BaseController');

class ObjectController extends BaseController {
  async publishNewObject(ctx) {
		if (await ObjectModel.addObject(ctx.request.body))
 		  ctx.body = "ok";
    else ctx.body = "error"
	}

	async getAllObjects(ctx) {
    const objects = await ObjectModel.getAllData();
    ctx.body = objects || "error";
  }

  async toggleObjectState(ctx) {
    if (ObjectModel.toggleObject(ctx.request.body.id))
      ctx.body = "ok";
    else ctx.body = "error"
  }

}
module.exports = new ObjectController();