import EntityList from "../../../core/crud-engine/EntityList.jsx";
import maintenanceRecordSchema from "../maintenanceRecord.schema.js";

export default function MaintenanceListPage() {
  return <EntityList schema={maintenanceRecordSchema} apiPath="/fleet/maintenance" basePath="/maintenance" />;
}
