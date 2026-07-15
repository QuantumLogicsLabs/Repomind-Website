import { Link } from "react-router-dom";
import PageBrand from "../components/PageBrand";
import TaskCard from "../components/TaskCard";
import { tasks, completionCriteria } from "../data/tasks";

export default function Tasks() {
  return (
  <>
    <header className="page-header">
      <PageBrand />
      <span className="page-header__eyebrow">Developer Objectives</span>
      <h1>Team Tasks</h1>
      <p>
        Eight mission-critical workstreams for the RepoMind team. Each task has clear goals,
        actionable steps, and the key files you will touch. Your work is done when the PR is open.
      </p>
    </header>

    <div className="task-grid task-grid--full">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>

    <aside className="info-panel">
      <h3>Definition of Done</h3>
      <p>{completionCriteria}</p>
      <ul className="checklist">
        <li>Feature branch created from <code>main</code></li>
        <li>Tests pass locally and in CI</li>
        <li>PR template filled out completely</li>
        <li>At least one reviewer requested</li>
      </ul>
      <Link to="/get-started" className="btn btn--primary btn--sm">
        Setup guide →
      </Link>
    </aside>
  </>
  );
}
