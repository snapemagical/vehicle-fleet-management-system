import EntityForm from "../../../core/crud-engine/EntityForm.jsx";
import vehicleSchema from "../vehicle.schema.js";

export default function VehicleFormPage() {
  return <EntityForm schema={vehicleSchema} apiPath="/fleet/vehicles" basePath="/vehicles" />;
}
