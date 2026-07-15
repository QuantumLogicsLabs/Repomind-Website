import { NavLink, Outlet } from "react-router-dom";
import Logo from "./Logo";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/tasks", label: "Objectives" },
  { to: "/architecture", label: "Architecture" },
  { to: "/get-started", label: "Get Started" },
];

export default function Layout() {
  return (
    <div className="layout">
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow bg-glow--cyan" aria-hidden="true" />
      <div className="bg-glow bg-glow--violet" aria-hidden="true" />

      <header className="header">
        <NavLink to="/" className="header-logo">
          <Logo size="md" />
        </NavLink>

        <nav className="nav" aria-label="Main navigation">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <Logo size="sm" className="footer__brand" />
        <p>
          The Brain of{" "}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            HackingTheRepo
          </a>
        </p>
        <p className="footer-muted">MIT License · Built for developers, by developers</p>
      </footer>
    </div>
  );
}
