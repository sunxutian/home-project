import { requireAuth } from "@/lib/auth";
import { getTasksView } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  await requireAuth();
  const { tasks, members } = await getTasksView();

  return (
    <main className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Tasks</p>
        <h1>Household Task List</h1>
      </header>
      <section className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Category</th>
              <th>Schedule</th>
              <th>Assignee</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.category}</td>
                <td>{task.scheduleKey ? task.scheduleKey : task.dueDate ?? "one-time"}</td>
                <td>{task.assignee?.name ?? "Unassigned"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="panel">
        <h2>Assignable Household Members</h2>
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
