const records = [
  { title: "PSE&G", type: "Utility", detail: "March bill on file" },
  { title: "Boiler Warranty", type: "Warranty", detail: "Active through 2028" }
];

const contacts = [
  { name: "PSE&G Support", type: "Utility", detail: "support line" },
  { name: "Local Plumber", type: "Vendor", detail: "annual service" }
];

export default function RecordsPage() {
  return (
    <main className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Records</p>
        <h1>Documents and Contacts</h1>
      </header>
      <section className="dual-panel">
        <article className="panel">
          <h2>Records</h2>
          <ul className="panel-list">
            {records.map((record) => (
              <li key={record.title}>
                <strong>{record.title}</strong>
                <span>
                  {record.type} · {record.detail}
                </span>
              </li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <h2>Contacts</h2>
          <ul className="panel-list">
            {contacts.map((contact) => (
              <li key={contact.name}>
                <strong>{contact.name}</strong>
                <span>
                  {contact.type} · {contact.detail}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
