import { requireAuth } from "@/lib/auth";
import { getSettingsView } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireAuth();
  const members = await getSettingsView();

  return (
    <main className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Settings</p>
        <h1>Household Members</h1>
      </header>
      <section className="panel">
        <ul className="panel-list">
          {members.map((member) => (
            <li key={member.id}>
              <strong>{member.name}</strong>
              <span>{member.active ? "Active" : "Inactive"}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
