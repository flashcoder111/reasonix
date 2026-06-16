import { Boxes, Code2, GitBranch, Sparkles, Terminal } from "lucide-react";

const floatingBadges = [
  { label: "CLI", className: "left-[8%] top-[16%]", Icon: Terminal },
  { label: "Git", className: "right-[10%] top-[12%]", Icon: GitBranch },
  { label: "MCP", className: "bottom-[19%] left-[3%]", Icon: Boxes },
  { label: "Plan", className: "bottom-[12%] right-[5%]", Icon: Sparkles },
] as const;

const codeRows = [
  "const agent = reasonix(project)",
  "await agent.plan(task)",
  "diff.apply(reviewedPatch)",
] as const;

export function ReasonixAgentVisual() {
  return (
    <div className="reasonix-visual-shell">
      <div className="reasonix-visual-grid" aria-hidden="true" />

      <div className="reasonix-visual-stage" aria-hidden="true">
        <div className="reasonix-visual-stack">
          <div className="reasonix-visual-panel reasonix-visual-panel-back">
            <div className="reasonix-panel-header">
              <span />
              <span />
              <span />
            </div>
            <div className="reasonix-panel-lines">
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="reasonix-visual-panel reasonix-visual-panel-main">
            <div className="reasonix-panel-toolbar">
              <span className="reasonix-panel-mark">
                <Code2 className="h-4 w-4" />
              </span>
              <span className="reasonix-panel-path">reasonix/session.ts</span>
            </div>
            <div className="reasonix-code-block">
              {codeRows.map((row, index) => (
                <p key={row}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {row}
                </p>
              ))}
            </div>
          </div>

          <div className="reasonix-visual-panel reasonix-visual-panel-front">
            <div className="reasonix-agent-core">
              <span className="reasonix-core-face reasonix-core-face-a" />
              <span className="reasonix-core-face reasonix-core-face-b" />
              <span className="reasonix-core-face reasonix-core-face-c" />
              <span className="reasonix-core-face reasonix-core-face-d" />
            </div>
          </div>
        </div>
      </div>

      {floatingBadges.map(({ label, className, Icon }) => (
        <div key={label} className={`reasonix-floating-badge ${className}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
