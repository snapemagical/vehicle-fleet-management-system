import EntityList from "../../../core/crud-engine/EntityList.jsx";
import vehicleSchema from "../vehicle.schema.js";

export default function VehicleListPage() {
  return <EntityList schema={vehicleSchema} apiPath="/fleet/vehicles" basePath="/vehicles" />;
}
