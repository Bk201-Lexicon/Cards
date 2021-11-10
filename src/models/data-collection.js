/**
 * @class ModelHelper
 * @classdesc A collection of methods for working with Sequelize model.
 * @constructor(model) - Sequelize model.
 * @method get(id) - Get a record or all records from the model by id.
 * @method create(data) - Create a record in the model.
 * @method update(id, data) - Update a record in the model.
 * @method delete(id) - Delete a record in the model.
 */
class ModelHelper {
  constructor(model) {
    this.model = model;
  }
  get(id) {
    if (id) return this.model.findOne({ where: { id } });
    else return this.model.findAll();
  }
  create = (data) => this.model.create(data);
  update = (id, data) => this.model.update(data, { where: { id } });
  delete = (id) => this.model.destroy({ where: { id } });
}
module.exports = ModelHelper;
