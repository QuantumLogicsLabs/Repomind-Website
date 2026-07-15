export const LOGO_SRC = "/favicon.png";

const sizes = {
  sm: 28,
  md: 36,
  lg: 64,
  xl: 120,
} as const;

interface LogoProps {
  size?: keyof typeof sizes;
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const px = sizes[size];

  return (
    <span className={`brand${className ? ` ${className}` : ""}`}>
      <img
        src={LOGO_SRC}
        alt="RepoMind"
        className="brand__img"
        width={px}
        height={px}
        draggable={false}
      />
      {showText && (
        <span className="brand__text">
          Repo<span className="brand__accent">Mind</span>
        </span>
      )}
    </span>
  );
}
