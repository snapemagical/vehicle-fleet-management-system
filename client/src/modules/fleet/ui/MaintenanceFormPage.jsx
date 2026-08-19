import EntityForm from "../../../core/crud-engine/EntityForm.jsx";
import maintenanceRecordSchema from "../maintenanceRecord.schema.js";

export default function MaintenanceFormPage() {
  return <EntityForm schema={maintenanceRecordSchema} apiPath="/fleet/maintenance" basePath="/maintenance" />;
}
