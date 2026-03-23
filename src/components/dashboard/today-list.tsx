import React from "react";

type TaskListItem = {
  title: string;
  date: string;
};

type TodayListProps = {
  tasks: TaskListItem[];
};

export function TodayList({ tasks }: TodayListProps) {
  if (tasks.length === 0) {
    return <p className="empty-copy">Nothing is due today.</p>;
  }

  return (
    <ul className="panel-list">
      {tasks.map((task) => (
        <li key={`${task.title}-${task.date}`}>
          <strong>{task.title}</strong>
          <span>{task.date}</span>
        </li>
      ))}
    </ul>
  );
}
