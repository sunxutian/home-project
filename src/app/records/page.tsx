import { requireAuth } from "@/lib/auth";
import { getRecordsView } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function RecordsPage() {
  await requireAuth();
  const house = await getRecordsView();

  if (!house) {
    return <main className="page-stack"><h1>Documents and Contacts</h1><p>No house data found.</p></main>;
  }

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
            {house.records.map((record) => (
              <li key={record.id}>
                <strong>{record.title}</strong>
                <span>
                  {record.type} · {record.provider}
                </span>
              </li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <h2>Contacts</h2>
          <ul className="panel-list">
            {house.contacts.map((contact) => (
              <li key={contact.id}>
                <strong>{contact.name}</strong>
                <span>
                  {contact.type} · {contact.phone}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
