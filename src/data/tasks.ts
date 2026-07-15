export interface Task {
  id: number;
  title: string;
  slug: string;
  goal: string;
  objectives: string[];
  howToAccomplish: string[];
  keyFiles: string[];
  accent: string;
}

export const tasks: Task[] = [
  {
    id: 1,
    title: "Migrate Completely to Groq",
    slug: "groq-migration",
    goal: "Remove all remaining OpenAI dependencies and make Groq the only supported LLM.",
    objectives: [
      "Remove all remaining OpenAI dependencies",
      "Make Groq the only supported LLM",
      "Update configuration and environment variables",
      "Ensure every AI component works correctly with Groq",
    ],
    howToAccomplish: [
      "Audit the codebase for OpenAI imports — start in config/settings.py and agent/chain.py",
      "Set GROQ_API_KEY as the required env var; remove or deprecate OPENAI_API_KEY",
      "Update LLM_MODEL default to a Groq model (e.g. llama-3.3-70b-versatile)",
      "Run the full test suite with mocked Groq responses to verify planner and executor",
      "Test POST /run end-to-end against a sample repo with a real Groq key",
    ],
    keyFiles: ["config/settings.py", "agent/chain.py", "agent/planner.py", "agent/executor.py"],
    accent: "#00f5a0",
  },
  {
    id: 2,
    title: "Optimize AI Context & Token Usage",
    slug: "token-optimization",
    goal: 'Fix the "Request Too Large (413)" error and send only the context the LLM actually needs.',
    objectives: [
      'Fix the "Request Too Large (413)" error',
      "Reduce unnecessary repository context",
      "Implement Groq API key rotation when rate limits are hit",
      "Implement smarter file selection before sending data to the LLM",
      "Improve prompt efficiency without reducing response quality",
    ],
    howToAccomplish: [
      "Profile which files code_parser.py sends to the LLM — log token counts per request",
      "Add ignore patterns for .git, node_modules, build, dist, and other non-source dirs",
      "Implement a relevance scorer: README, ARCHITECTURE.md, and target_files hints first",
      "Trim memory context in agent/memory.py — keep the last N messages within a token budget",
      "Build a key rotation helper that swaps GROQ_API_KEY on 429/limit errors",
    ],
    keyFiles: ["tools/code_parser.py", "agent/memory.py", "prompts/system_prompt.py", "config/settings.py"],
    accent: "#34d399",
  },
  {
    id: 3,
    title: "Improve Repository Intelligence",
    slug: "repo-intelligence",
    goal: "Automatically understand a repository's architecture before planning any changes.",
    objectives: [
      "Automatically identify important project files (README.md, ARCHITECTURE.md, etc.)",
      "Ignore unnecessary folders (.git, node_modules, build, dist, etc.)",
      "Detect project architecture, frameworks, entry points, dependencies, and file relationships",
      "Create a README.md automatically when one does not exist",
    ],
    howToAccomplish: [
      "Extend code_parser.py to walk the repo and build a structured project map",
      "Detect frameworks from package.json, pyproject.toml, requirements.txt, Cargo.toml, etc.",
      "Identify entry points (main.py, index.ts, app.py) and dependency graphs",
      "Prioritize ARCHITECTURE.md and README.md in the context window sent to the planner",
      "Add a tool step that generates README.md when missing, using repo analysis output",
    ],
    keyFiles: ["tools/code_parser.py", "agent/planner.py", "tools/github_tool.py"],
    accent: "#a78bfa",
  },
  {
    id: 4,
    title: "Enhance AI Planning & Code Modification",
    slug: "planning-code-mod",
    goal: "Generate more accurate, style-preserving code edits with validation before apply.",
    objectives: [
      "Improve step-by-step planning",
      "Generate more accurate code edits",
      "Support .repomind/ workspace: User.md, Folder structure.txt, Prompt.txt/md",
      "Preserve existing coding style",
      "Validate generated changes before applying them",
      "Reduce incorrect or unnecessary modifications",
    ],
    howToAccomplish: [
      "Create a .repomind/ directory convention in cloned repos for user context files",
      "Wire User.md (from github-profile-reviewer) and folder structure exports into planner context",
      "Strengthen prompts in prompts/ to enforce style matching and minimal diffs",
      "Add a validation step in executor.py: syntax check, lint, or diff size limits before commit",
      "Use acceptance_criteria on each PlanStep to verify completion before moving on",
    ],
    keyFiles: ["agent/planner.py", "agent/executor.py", "prompts/system_prompt.py", "tools/diff_generator.py"],
    accent: "#f472b6",
  },
  {
    id: 5,
    title: "Strengthen GitHub Workflow Automation",
    slug: "github-workflow",
    goal: "Make cloning, branching, committing, pushing, and PR creation rock-solid.",
    objectives: [
      "Improve repository cloning",
      "Handle authentication failures gracefully",
      "Improve branch creation, commits, pushes, and automatic Pull Request creation",
      "Automatically generate better PR titles and descriptions",
    ],
    howToAccomplish: [
      "Harden github_tool.py with clear error messages for invalid tokens and permissions",
      "Add retry logic for transient GitHub API failures",
      "Ensure branch names follow a consistent repomind/ prefix convention",
      "Improve pr_tool.py and prompts/pr_description.py for structured, reviewer-friendly PR bodies",
      "Test the full clone → branch → commit → push → PR flow in tests/test_tools.py with mocks",
    ],
    keyFiles: ["tools/github_tool.py", "tools/pr_tool.py", "prompts/pr_description.py"],
    accent: "#fb923c",
  },
  {
    id: 6,
    title: "Smart Code Review & Impact Analysis",
    slug: "impact-analysis",
    goal: "Analyze blast radius before applying changes and warn about risky edits.",
    objectives: [
      "Analyze which files will be affected before any change",
      "Use git branches for risky tasks — merge to main only on success",
      "Detect possible side effects",
      "Estimate the impact of the modification",
      "Warn about risky edits before creating the Pull Request",
    ],
    howToAccomplish: [
      "Build an impact analysis step that runs after planning but before execution",
      "Map target_files to dependents using import/reference analysis in code_parser.py",
      "Flag high-risk patterns: deletions, public API changes, config edits",
      "Always work on feature branches; never commit directly to main",
      "Include an impact summary section in the PR description generated by pr_tool.py",
    ],
    keyFiles: ["tools/code_parser.py", "tools/pr_tool.py", "agent/executor.py"],
    accent: "#facc15",
  },
  {
    id: 7,
    title: "Build a Smarter Agent Experience",
    slug: "agent-experience",
    goal: "Extend the agent with memory, refinements, explanations, and progress tracking.",
    objectives: [
      "Better conversation memory (Prompt.md)",
      "Support multiple refinement requests",
      "Explain why it generated each change",
      "Provide progress updates while working (store history to MongoDB/Supabase)",
      "Generate a summary of completed work after every task",
    ],
    howToAccomplish: [
      "Extend agent/memory.py beyond in-memory storage — design a Redis/MongoDB/Supabase adapter",
      "Wire POST /refine to append instructions while preserving session context",
      "Add a 'reason' field to every FileChange and surface it in PR descriptions",
      "Emit step-by-step progress events (prep for WebSocket streaming in Task 8)",
      "Generate a completion summary in chain.py and persist it with the job record",
    ],
    keyFiles: ["agent/memory.py", "agent/chain.py", "api/routes.py", "utils/job_manager.py"],
    accent: "#60a5fa",
  },
  {
    id: 8,
    title: "Advanced Features",
    slug: "advanced-features",
    goal: "Research and implement one or more cutting-edge capabilities for RepoMind.",
    objectives: [
      "Automatic bug detection and fixing",
      "Repository-wide code search using embeddings",
      "Live progress updates with WebSockets",
      "Multi-repository support",
      "Automatic test generation after code changes",
      "Plugin system for custom tools",
      "AI-generated documentation for modified code",
      "Repository health report with code quality insights",
    ],
    howToAccomplish: [
      "Pick one feature, open a design issue, and prototype in a feat/ branch",
      "For WebSockets: add a /ws/{job_id} endpoint alongside GET /status polling",
      "For embeddings: integrate LlamaIndex or a vector store for large monorepos",
      "For plugins: define a ToolSpec registration interface in tools/__init__.py",
      "For test generation: call test_executor.py after file changes and include results in PR",
      "Document your chosen feature in docs/ARCHITECTURE.md before opening the PR",
    ],
    keyFiles: ["api/routes.py", "tools/", "agent/chain.py", "docs/ARCHITECTURE.md"],
    accent: "#e879f9",
  },
];

export const completionCriteria =
  "A task is considered complete only after the Pull Request has been created and submitted for review.";
