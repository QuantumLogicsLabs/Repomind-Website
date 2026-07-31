import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import TaskCard from "../components/TaskCard";
import { tasks, completionCriteria } from "../data/tasks";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Logo size="xl" showText={false} className="hero__logo" />

        <div className="hero__badge">
          <span className="pulse" aria-hidden="true" />
          Developer Mission Control
        </div>

        <h1 className="hero__title">
          The brain that
          <br />
          <span className="gradient-text">understands your repo</span>
        </h1>

        <p className="hero__subtitle">
          RepoMind is the standalone ML engine behind HackingTheRepo. It clones real repositories,
          plans code changes with an LLM-powered agent, executes edits, and opens Pull Requests —
          all from a plain-English instruction.
        </p>

        <div className="hero__actions">
          <Link to="/tasks" className="btn btn--primary">
            View Team Objectives
          </Link>
          <Link to="/get-started" className="btn btn--ghost">
            Start Contributing
          </Link>
        </div>

        <div className="hero__stats">
          <div className="stat">
            <span className="stat__value">15</span>
            <span className="stat__label">Mission Objectives</span>
          </div>
          <div className="stat">
            <span className="stat__value">LangChain</span>
            <span className="stat__label">Agent Framework</span>
          </div>
          <div className="stat">
            <span className="stat__value">FastAPI</span>
            <span className="stat__label">HTTP Service</span>
          </div>
          <div className="stat">
            <span className="stat__value">Groq</span>
            <span className="stat__label">LLM Backend</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <span className="section__eyebrow">The Aura</span>
          <h2>What RepoMind stands for</h2>
          <p>
            RepoMind is not a chatbot wrapper. It is an autonomous software engineer that respects
            your codebase, your style, and your workflow.
          </p>
        </div>

        <div className="aura-grid">
          <article className="aura-card">
            <div className="aura-card__icon" aria-hidden="true">🧠</div>
            <h3>Agentic Intelligence</h3>
            <p>
              A LangChain planner decomposes any instruction into ordered, atomic edit steps before
              a single file is touched. Every change is deliberate.
            </p>
          </article>
          <article className="aura-card">
            <div className="aura-card__icon" aria-hidden="true">🔍</div>
            <h3>Context-Aware</h3>
            <p>
              The agent reads and reasons over the entire repository — architecture, dependencies,
              entry points — before generating code that matches existing patterns.
            </p>
          </article>
          <article className="aura-card">
            <div className="aura-card__icon" aria-hidden="true">⚡</div>
            <h3>GitHub-Native</h3>
            <p>
              Clone, branch, commit, push, and open PRs programmatically. Your work lands as a real
              Pull Request ready for human review.
            </p>
          </article>
          <article className="aura-card">
            <div className="aura-card__icon" aria-hidden="true">🔒</div>
            <h3>Safe by Design</h3>
            <p>
              Structured LLM output via Pydantic. No eval of generated code. Fine-grained tokens.
              Impact analysis before risky edits.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <span className="section__eyebrow">Your Mission</span>
          <h2>Team objectives at a glance</h2>
          <p>
            Fifteen focused workstreams to take RepoMind from prototype to production-grade agent.
            Pick a task, ship a PR.
          </p>
        </div>

        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        <div className="completion-banner">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.7 5.3a1 1 0 00-1.4-1.4L9 9.2 7.7 7.9a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
              fill="currentColor"
            />
          </svg>
          <p>{completionCriteria}</p>
        </div>
      </section>

      <section className="section flow-section">
        <div className="section__header">
          <span className="section__eyebrow">How It Works</span>
          <h2>From instruction to Pull Request</h2>
        </div>

        <div className="flow">
          <div className="flow__step">
            <span className="flow__num">01</span>
            <h4>Instruction</h4>
            <p>Developer describes the change in plain English via POST /run</p>
          </div>
          <div className="flow__arrow" aria-hidden="true">→</div>
          <div className="flow__step">
            <span className="flow__num">02</span>
            <h4>Plan</h4>
            <p>TaskPlanner breaks it into ordered PlanSteps with acceptance criteria</p>
          </div>
          <div className="flow__arrow" aria-hidden="true">→</div>
          <div className="flow__step">
            <span className="flow__num">03</span>
            <h4>Execute</h4>
            <p>StepExecutor calls tools: parse, generate, diff, commit</p>
          </div>
          <div className="flow__arrow" aria-hidden="true">→</div>
          <div className="flow__step">
            <span className="flow__num">04</span>
            <h4>PR</h4>
            <p>pr_tool composes title and body, opens the Pull Request on GitHub</p>
          </div>
        </div>

        <div className="section__cta">
          <Link to="/architecture" className="btn btn--ghost">
            Explore full architecture →
          </Link>
        </div>
      </section>
    </>
  );
}
