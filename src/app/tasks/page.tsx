const taskRows = [
  { title: "Take out garbage", category: "municipal", cadence: "Tuesday / Friday" },
  { title: "Take out recycling", category: "municipal", cadence: "Wednesday" },
  { title: "Replace HVAC filter", category: "maintenance", cadence: "One-time" }
];

export default function TasksPage() {
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
              <th>Cadence</th>
            </tr>
          </thead>
          <tbody>
            {taskRows.map((task) => (
              <tr key={task.title}>
                <td>{task.title}</td>
                <td>{task.category}</td>
                <td>{task.cadence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
