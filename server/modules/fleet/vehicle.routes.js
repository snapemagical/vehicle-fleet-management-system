const makeCrudRouter = require("../../core/crud-engine/makeCrudRouter");
const Vehicle = require("./vehicle.model");
const schema = require("./vehicle.schema");

module.exports = makeCrudRouter(Vehicle, schema);
