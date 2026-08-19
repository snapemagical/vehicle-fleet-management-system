import EntityList from "../../../core/crud-engine/EntityList.jsx";
import tripSchema from "../trip.schema.js";

export default function TripListPage() {
  return <EntityList schema={tripSchema} apiPath="/fleet/trips" basePath="/trips" />;
}
