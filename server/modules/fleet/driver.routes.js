const makeCrudRouter = require("../../core/crud-engine/makeCrudRouter");
const Driver = require("./driver.model");
const schema = require("./driver.schema");

module.exports = makeCrudRouter(Driver, schema);
