const makeCrudRouter = require("../../core/crud-engine/makeCrudRouter");
const MaintenanceRecord = require("./maintenanceRecord.model");
const schema = require("./maintenanceRecord.schema");

module.exports = makeCrudRouter(MaintenanceRecord, schema);
