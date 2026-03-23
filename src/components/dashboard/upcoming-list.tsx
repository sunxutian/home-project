import React from "react";

type TaskListItem = {
  title: string;
  date: string;
};

type UpcomingListProps = {
  tasks: TaskListItem[];
};

export function UpcomingList({ tasks }: UpcomingListProps) {
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
