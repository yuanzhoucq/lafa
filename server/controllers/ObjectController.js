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

  async getObjectsByUserId(ctx) {
    ctx.body = (await ObjectModel.getObjectsByUserId(ctx.request.body.userId)) || "error";
  }

  async toggleObjectState(ctx) {
    ctx.body = (await ObjectModel.toggleObject(ctx.request.body.id)) ? "ok" : "error";
  }

}
module.exports = new ObjectController();