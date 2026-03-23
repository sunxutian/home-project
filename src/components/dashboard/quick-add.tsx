import React from "react";
import Link from "next/link";

export function QuickAdd() {
  return (
    <div className="quick-add">
      <Link className="quick-add-button" href="/tasks">
        Quick Add
      </Link>
      <p>Add a one-time reminder or household task from the tasks page.</p>
    </div>
  );
}
