import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { Task } from "../data/tasks";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Link to={`/tasks/${task.slug}`} className="task-card" style={{ "--accent": task.accent } as CSSProperties}>
      <div className="task-card__number">0{task.id}</div>
      <h3 className="task-card__title">{task.title}</h3>
      <p className="task-card__goal">{task.goal}</p>
      <span className="task-card__cta">
        View objectives
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
