const members = [
  { name: "Household", status: "Active" },
  { name: "Shared", status: "Active" }
];

export default function SettingsPage() {
  return (
    <main className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Settings</p>
        <h1>Household Members</h1>
      </header>
      <section className="panel">
        <ul className="panel-list">
          {members.map((member) => (
            <li key={member.name}>
              <strong>{member.name}</strong>
              <span>{member.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
