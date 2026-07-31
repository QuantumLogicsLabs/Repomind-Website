import { Link } from "react-router-dom";
import PageBrand from "../components/PageBrand";

const setupSteps = [
  {
    title: "Clone the repository",
    code: `git clone https://github.com/your-org/repomind.git
cd repomind`,
  },
  {
    title: "Create a virtual environment",
    code: `python -m venv .venv
.venv\\Scripts\\activate        # Windows
# source .venv/bin/activate     # macOS / Linux`,
  },
  {
    title: "Install dependencies",
    code: `pip install -e ".[dev]"`,
  },
  {
    title: "Configure environment",
    code: `cp config/.env.example .env
# Fill in: GROQ_API_KEY, GITHUB_TOKEN, GITHUB_USERNAME`,
  },
  {
    title: "Verify setup",
    code: `python -c "import fastapi, langchain, pydantic; print('OK')"
uvicorn api.main:app --reload --port 8000
pytest tests/ -v`,
  },
];

const branchPrefixes = [
  { type: "Feature", prefix: "feat/", example: "feat/groq-key-rotation" },
  { type: "Bug fix", prefix: "fix/", example: "fix/memory-context-overflow" },
  { type: "Prompt update", prefix: "prompt/", example: "prompt/better-plan-decomposition" },
  { type: "Refactor", prefix: "refactor/", example: "refactor/executor-error-handling" },
  { type: "Docs", prefix: "docs/", example: "docs/architecture-diagram" },
];

export default function GetStarted() {
  return (
    <>
      <header className="page-header">
        <PageBrand />
        <span className="page-header__eyebrow">Contributor Guide</span>
        <h1>Get Started</h1>
        <p>
          Everything you need to go from zero to a merged Pull Request. RepoMind acts on real
          repositories with real credentials — quality and security matter.
        </p>
      </header>

      <section className="section">
        <h2>Development Setup</h2>
        <div className="setup-steps">
          {setupSteps.map((step, i) => (
            <div key={i} className="setup-step">
              <div className="setup-step__header">
                <span className="setup-step__num">{i + 1}</span>
                <h3>{step.title}</h3>
              </div>
              <pre className="code-block code-block--copy">
                <code>{step.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Workflow</h2>
        <div className="workflow-cards">
          <article className="workflow-card">
            <span className="workflow-card__step">1</span>
            <h3>Pick a task</h3>
            <p>
              Browse the fifteen team objectives and choose one that matches your skills. Read the
              goals and key files before writing code.
            </p>
            <Link to="/tasks" className="link-arrow">View objectives →</Link>
          </article>
          <article className="workflow-card">
            <span className="workflow-card__step">2</span>
            <h3>Create a branch</h3>
            <p>
              Branch from <code>main</code> using conventional prefixes. One feature per branch,
              one PR per feature.
            </p>
          </article>
          <article className="workflow-card">
            <span className="workflow-card__step">3</span>
            <h3>Ship with tests</h3>
            <p>
              Mock the LLM and GitHub in tests. Run <code>black .</code>, <code>ruff check .</code>,
              and <code>pytest tests/ -v</code> before pushing.
            </p>
          </article>
          <article className="workflow-card">
            <span className="workflow-card__step">4</span>
            <h3>Open a PR</h3>
            <p>
              Fill the PR template completely. Request review. A task is done when the PR is
              submitted — not when the code is written.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>Branch Naming</h2>
        <div className="tools-table-wrap">
          <table className="tools-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Prefix</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              {branchPrefixes.map((row) => (
                <tr key={row.prefix}>
                  <td>{row.type}</td>
                  <td><code>{row.prefix}</code></td>
                  <td><code className="muted">{row.example}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2>Commit Messages</h2>
        <p className="section__intro">
          Follow <a href="https://www.conventionalcommits.org/" target="_blank" rel="noopener noreferrer">Conventional Commits</a>:
        </p>
        <pre className="code-block">
{`<type>(<scope>): <short description>

feat(tools): add groq key rotation on rate limit
fix(executor): handle missing tool name without crashing
prompt(code_gen): improve few-shot examples for async refactors
test(api): add coverage for POST /refine error cases`}
        </pre>
      </section>

      <section className="section">
        <h2>Security Rules</h2>
        <div className="security-grid">
          <div className="security-item security-item--danger">
            <strong>Never commit .env</strong>
            <p>Use config/.env.example as the only committed template.</p>
          </div>
          <div className="security-item security-item--danger">
            <strong>No eval() on LLM output</strong>
            <p>Parse structured responses through Pydantic models only.</p>
          </div>
          <div className="security-item">
            <strong>Fine-grained GitHub PATs</strong>
            <p>Minimum repo scope, with expiration dates.</p>
          </div>
          <div className="security-item">
            <strong>Mock GitHub in tests</strong>
            <p>CI must never clone real repos or open real PRs.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Prerequisites</h2>
        <div className="prereq-grid">
          <div className="prereq-item">
            <span className="prereq-item__label">Python</span>
            <span className="prereq-item__value">3.11+</span>
          </div>
          <div className="prereq-item">
            <span className="prereq-item__label">GitHub PAT</span>
            <span className="prereq-item__value">repo scope</span>
          </div>
          <div className="prereq-item">
            <span className="prereq-item__label">Groq API Key</span>
            <span className="prereq-item__value">required</span>
          </div>
          <div className="prereq-item">
            <span className="prereq-item__label">Docker</span>
            <span className="prereq-item__value">optional</span>
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <PageBrand />
        <h2>Ready to build?</h2>
        <p>Pick an objective, create your branch, and ship a PR.</p>
        <Link to="/tasks" className="btn btn--primary">
          View Team Objectives
        </Link>
      </div>
    </>
  );
}
