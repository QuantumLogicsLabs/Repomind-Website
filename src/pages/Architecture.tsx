import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import PageBrand from "../components/PageBrand";

const layers = [
  {
    name: "HTTP API",
    pkg: "api/",
    desc: "Receive requests, manage job lifecycle, return status",
    color: "#22d3ee",
  },
  {
    name: "Agent Orchestration",
    pkg: "agent/",
    desc: "Wire LLM + memory + tools into a single run() call",
    color: "#a78bfa",
  },
  {
    name: "Planner",
    pkg: "agent/planner.py",
    desc: "Turn an instruction into ordered PlanStep objects",
    color: "#34d399",
  },
  {
    name: "Executor",
    pkg: "agent/executor.py",
    desc: "Iterate steps, pick tools, collect FileChange objects",
    color: "#f472b6",
  },
  {
    name: "Tools",
    pkg: "tools/",
    desc: "Clone, parse, diff, commit, open PR — atomic operations",
    color: "#fb923c",
  },
  {
    name: "Prompts",
    pkg: "prompts/",
    desc: "Version-controlled LLM prompt templates",
    color: "#facc15",
  },
];

const tools = [
  { name: "github_tool", file: "tools/github_tool.py", desc: "Clone, branch, commit, push via GitPython" },
  { name: "code_parser", file: "tools/code_parser.py", desc: "Walk repo, read source files into context dict" },
  { name: "diff_generator", file: "tools/diff_generator.py", desc: "Unified diffs from old/new content" },
  { name: "pr_tool", file: "tools/pr_tool.py", desc: "Build PR title + body, open via PyGitHub" },
  { name: "test_executor", file: "tools/test_executor.py", desc: "Test runner integration stub" },
];

export default function Architecture() {
  return (
    <>
      <header className="page-header">
        <PageBrand />
        <span className="page-header__eyebrow">System Design</span>
        <h1>Architecture</h1>
        <p>
          RepoMind is a stateless FastAPI service wrapping a LangChain-based AI agent. Understand
          the layers before you change them.
        </p>
      </header>

      <section className="arch-diagram">
        <h2>Request Lifecycle</h2>
        <div className="pipeline">
          <div className="pipeline__node pipeline__node--external">
            <span className="pipeline__label">External Caller</span>
            <span className="pipeline__name">HackingTheRepo Platform</span>
          </div>
          <div className="pipeline__connector" aria-hidden="true">
            <span>POST /run</span>
          </div>
          <div className="pipeline__node">
            <span className="pipeline__label">api/</span>
            <span className="pipeline__name">FastAPI + Job Manager</span>
          </div>
          <div className="pipeline__connector" aria-hidden="true">
            <span>background task</span>
          </div>
          <div className="pipeline__node pipeline__node--agent">
            <span className="pipeline__label">agent/</span>
            <span className="pipeline__name">Memory → Planner → Executor</span>
          </div>
          <div className="pipeline__connector" aria-hidden="true">
            <span>tool calls</span>
          </div>
          <div className="pipeline__node pipeline__node--tools">
            <span className="pipeline__label">tools/</span>
            <span className="pipeline__name">github · parser · diff · pr</span>
          </div>
          <div className="pipeline__connector" aria-hidden="true">
            <span>GitHub API</span>
          </div>
          <div className="pipeline__node pipeline__node--result">
            <span className="pipeline__label">Output</span>
            <span className="pipeline__name">Pull Request Created</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Layer Breakdown</h2>
        <div className="layer-grid">
          {layers.map((layer) => (
            <article
              key={layer.name}
              className="layer-card"
              style={{ "--layer-color": layer.color } as CSSProperties}
            >
              <code className="layer-card__pkg">{layer.pkg}</code>
              <h3>{layer.name}</h3>
              <p>{layer.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Built-in Tools</h2>
        <p className="section__intro">
          Each tool is a plain Python function wrapped in a <code>ToolSpec</code>. The executor LLM
          reads tool descriptions to decide which to call.
        </p>
        <div className="tools-table-wrap">
          <table className="tools-table">
            <thead>
              <tr>
                <th>Tool</th>
                <th>File</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.name}>
                  <td><code>{tool.name}</code></td>
                  <td><code className="muted">{tool.file}</code></td>
                  <td>{tool.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2>Agent Flow</h2>
        <div className="agent-flow">
          <pre className="code-block" aria-label="Agent execution flow">
{`User Instruction
      │
      ▼
  [ Planner ]          ← Breaks instruction into 1..N ordered steps
      │
      ▼
  [ Executor ]         ← Iterates steps; decides which tool to call
      │
  ┌───┴────────────────────────────────┐
  │                                    │
  ▼                                    ▼
[ code_parser ]               [ github_tool ]
Parse existing files           Clone, branch, commit
      │                                │
      ▼                                ▼
[ code_gen_prompt ]           [ diff_generator ]
Generate new code              Produce human-readable diff
      │                                │
      └───────────────┬────────────────┘
                      ▼
                 [ pr_tool ]
            Compose & open PR`}
          </pre>
        </div>
      </section>

      <section className="section">
        <h2>API Endpoints</h2>
        <div className="endpoint-grid">
          <div className="endpoint-card">
            <span className="endpoint-card__method">POST</span>
            <code>/run</code>
            <p>Start a new agent job with repo URL and instruction</p>
          </div>
          <div className="endpoint-card">
            <span className="endpoint-card__method endpoint-card__method--get">GET</span>
            <code>/status/{"{job_id}"}</code>
            <p>Poll job status, PR URL, and diff summary</p>
          </div>
          <div className="endpoint-card">
            <span className="endpoint-card__method">POST</span>
            <code>/refine</code>
            <p>Send follow-up instruction on an existing job</p>
          </div>
        </div>
      </section>

      <div className="section__cta">
        <Link to="/tasks" className="btn btn--primary">
          Pick an objective →
        </Link>
      </div>
    </>
  );
}
