import EntityForm from "../../../core/crud-engine/EntityForm.jsx";
import driverSchema from "../driver.schema.js";

export default function DriverFormPage() {
  return <EntityForm schema={driverSchema} apiPath="/fleet/drivers" basePath="/drivers" />;
}
