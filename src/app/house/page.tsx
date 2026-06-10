import { requireAuth } from "@/lib/auth";
import { getHouseView } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HousePage() {
  await requireAuth();
  const house = await getHouseView();

  if (!house) {
    return <main className="page-stack"><h1>Property Reference</h1><p>No house data found.</p></main>;
  }

  return (
    <main className="page-stack">
      <header className="page-header">
        <p className="eyebrow">House</p>
        <h1>Property Reference</h1>
      </header>
      <section className="panel">
        <dl className="snapshot-list">
          <div>
            <dt>Address</dt>
            <dd>
              {house.addressLine1}, {house.city}, {house.state} {house.postalCode}
            </dd>
          </div>
          <div>
            <dt>Systems</dt>
            <dd>{house.systems ?? "Not added yet"}</dd>
          </div>
          <div>
            <dt>Appliances</dt>
            <dd>{house.appliances ?? "Not added yet"}</dd>
          </div>
          <div>
            <dt>Warranty Details</dt>
            <dd>{house.warrantyDetails ?? "Not added yet"}</dd>
          </div>
          <div>
            <dt>Service Notes</dt>
            <dd>{house.serviceNotes ?? "Not added yet"}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
