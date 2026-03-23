export default function HousePage() {
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
            <dd>130 Durie Ave, Closter, NJ 07624</dd>
          </div>
          <div>
            <dt>Systems</dt>
            <dd>Boiler, sump pump, central air</dd>
          </div>
          <div>
            <dt>Appliances</dt>
            <dd>Washer, dryer, refrigerator</dd>
          </div>
          <div>
            <dt>Service Notes</dt>
            <dd>Boiler serviced in March 2026</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
