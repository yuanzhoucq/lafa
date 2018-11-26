const BaseModel = require("./BaseModel");

class ObjectModel extends BaseModel {
  constructor() {
    const structure = {
      title: String,
      userId: String,
      imgUrl: String,
      location: String,
      description: String,
      returned: {type: Boolean, default: false},
      contact: String
    };
    super("ObjectModel", "objects", structure);
  }

  async addObject(objectInfo) {
    try {
      const object = await new this.model(objectInfo).save();
      return object._id
    } catch (e) {
      this.logger.debug("addObject error: ", e);
      return false
    }
  }

  async getObjectsByUserId(userId) {
    try {
      return await this.model.find({userId})
    } catch (err) {
      this.logger.debug(`Getting objects by userId of ${super.name} failed: `, err);
      return false
    }
  }

  async toggleObject(id) {
    try {
      const objectState = await this.model.findById(id, "returned");
      const newState = !objectState.returned;
      return this.model.findByIdAndUpdate(id, {$set: {returned: newState}})
    } catch (e) {
      this.logger.debug("toggleObject error: ", e);
      return false
    }
  }
}

module.exports = new ObjectModel();
