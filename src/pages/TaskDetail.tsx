import type { CSSProperties } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import PageBrand from "../components/PageBrand";
import { tasks } from "../data/tasks";

export default function TaskDetail() {
  const { slug } = useParams();
  const task = tasks.find((t) => t.slug === slug);

  if (!task) return <Navigate to="/tasks" replace />;

  const prev = tasks.find((t) => t.id === task.id - 1);
  const next = tasks.find((t) => t.id === task.id + 1);

  return (
    <article className="task-detail" style={{ "--accent": task.accent } as CSSProperties}>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/tasks">Objectives</Link>
        <span aria-hidden="true">/</span>
        <span>Task {task.id}</span>
      </nav>

      <header className="task-detail__header">
        <PageBrand />
        <span className="task-detail__badge">Objective 0{task.id}</span>
        <h1>{task.title}</h1>
        <p className="task-detail__goal">{task.goal}</p>
      </header>

      <div className="task-detail__grid">
        <section className="detail-block">
          <h2>
            <span className="detail-block__icon" aria-hidden="true">◎</span>
            Goals
          </h2>
          <ul className="objective-list">
            {task.objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </section>

        <section className="detail-block detail-block--highlight">
          <h2>
            <span className="detail-block__icon" aria-hidden="true">→</span>
            How to Accomplish
          </h2>
          <ol className="howto-list">
            {task.howToAccomplish.map((step, i) => (
              <li key={i}>
                <span className="howto-list__num">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="detail-block">
          <h2>
            <span className="detail-block__icon" aria-hidden="true">⌘</span>
            Key Files
          </h2>
          <div className="file-tags">
            {task.keyFiles.map((file) => (
              <code key={file} className="file-tag">{file}</code>
            ))}
          </div>
        </section>

        <section className="detail-block detail-block--done">
          <h2>
            <span className="detail-block__icon" aria-hidden="true">✓</span>
            Definition of Done
          </h2>
          <p>
            A task is considered complete only after the Pull Request has been created and
            submitted for review. Ensure CI passes and the PR template is fully filled out.
          </p>
          <Link to="/get-started" className="btn btn--primary btn--sm">
            Contribution workflow →
          </Link>
        </section>
      </div>

      <nav className="task-nav" aria-label="Task navigation">
        {prev ? (
          <Link to={`/tasks/${prev.slug}`} className="task-nav__link task-nav__link--prev">
            <span className="task-nav__label">Previous</span>
            <span className="task-nav__title">0{prev.id}. {prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/tasks/${next.slug}`} className="task-nav__link task-nav__link--next">
            <span className="task-nav__label">Next</span>
            <span className="task-nav__title">0{next.id}. {next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
