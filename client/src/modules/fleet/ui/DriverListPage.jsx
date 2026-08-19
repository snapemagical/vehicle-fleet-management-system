import EntityList from "../../../core/crud-engine/EntityList.jsx";
import driverSchema from "../driver.schema.js";

export default function DriverListPage() {
  return <EntityList schema={driverSchema} apiPath="/fleet/drivers" basePath="/drivers" />;
}
