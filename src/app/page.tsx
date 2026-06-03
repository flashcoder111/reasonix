import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Download,
  ExternalLink,
  GitBranch,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { SITE, projectStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reasonix | The best top secret agent",
  description:
    "Download Reasonix on GitHub: a DeepSeek-native terminal coding agent built around prefix-cache stability, Flash-first iteration, Pro escalation, MCP, skills, and long-running agent observability.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Reasonix | The best top secret agent",
    description:
      "Reasonix is a DeepSeek-native terminal coding agent for long-running AI coding work, with cache-first loops, MCP, plan gates, and replayable sessions.",
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reasonix | The best top secret agent",
    description:
      "Download Reasonix on GitHub and run a DeepSeek-native coding agent in your terminal.",
  },
};

const advantages = [
  {
    title: "DeepSeek-native by design",
    body: "Reasonix is not a generic OpenAI-compatible wrapper. It is shaped around DeepSeek models, terminal workflows, and local project context.",
  },
  {
    title: "94%+ prefix-cache positioning",
    body: "Its cache-first loop keeps stable prompt regions byte-consistent, helping long sessions reuse DeepSeek prefix cache instead of paying for churn.",
  },
  {
    title: "Flash-first, Pro when needed",
    body: "Start with fast, lower-cost Flash iteration, then escalate hard turns with /pro or stronger presets when the task needs more reasoning.",
  },
  {
    title: "Terminal TUI plus desktop client",
    body: "Use the terminal-first agent for coding, or follow desktop release assets when you want a packaged multi-platform client.",
  },
  {
    title: "MCP, skills, sandbox, plan gate",
    body: "Connect external tool servers, compose reusable skills, keep tools bounded, and review plans before writes on risky work.",
  },
  {
    title: "Replayable long-session work",
    body: "Events, stats, replay, history, and checkpoints make extended agent runs easier to audit, debug, and resume.",
  },
] as const;

const quickStartSteps = [
  "Open the GitHub repository and review the current main-v2 branch or release assets.",
  "Run Reasonix in the project you want the agent to understand.",
  "Keep your DeepSeek API key in your own local environment or Reasonix config.",
] as const;

const resourceLinks = [
  {
    title: "GitHub download",
    description:
      "Open the official source repository, releases, branches, issues, and latest development signals.",
    href: SITE.github,
    label: "Open GitHub",
  },
  {
    title: "DeepSeek quick start",
    description:
      "Read DeepSeek's agent collection guide for the recommended npx startup path.",
    href: SITE.deepseekGuide,
    label: "Read guide",
  },
  {
    title: "Install notes",
    description:
      "Compare npx, source builds, and desktop release assets before choosing your install path.",
    href: "/github",
    label: "View options",
  },
  {
    title: "CLI troubleshooting",
    description:
      "Keep common npx, API key, build-tool, and terminal issues close when onboarding.",
    href: "/errors",
    label: "Fix errors",
  },
] as const;

export default function Page() {
  return (
    <SiteShell>
      <div className="-mx-4 -my-6 bg-white text-slate-950 sm:-mx-6 lg:-mx-10 lg:-my-10">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-12 pt-10 text-center sm:px-6 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
            <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">DeepSeek-native terminal coding agent</span>
          </div>

          <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
            Reasonix
          </h1>

          <p className="mt-4 text-lg font-medium leading-8 text-emerald-900 sm:text-2xl">
            The best top secret agent
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Reasonix is an open-source coding agent built for developers who
            want DeepSeek inside their terminal: stable long-running sessions,
            cache-aware prompting, MCP tools, skills, plan gates, and
            replayable work.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download on GitHub
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={SITE.deepseekGuide}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              Quick Start
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 grid w-full gap-4 text-left lg:grid-cols-[1fr_360px] lg:items-stretch">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Terminal className="h-4 w-4 text-emerald-800" aria-hidden="true" />
                Run Reasonix in your project
              </div>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm leading-7 text-emerald-200">
                {"cd /path/to/your-project\nnpx reasonix code\n# inside the TUI: /pro, /plan, /skill, /mcp"}
              </pre>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Start with the DeepSeek-recommended npx flow, then move to
                source builds or desktop releases when you need the newest
                branch or packaged client.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              {projectStats.map((stat) => (
                <div key={stat.label} className="rounded-lg bg-slate-50 p-3">
                  <dt className="text-xs text-slate-500">{stat.label}</dt>
                  <dd className="mt-1 text-lg font-semibold text-slate-950">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-xs text-slate-500">{stat.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-normal text-emerald-800">
            Why Reasonix
          </p>
          <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">
            Built for DeepSeek agent work, not just model switching
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            The project story centers on one practical goal: keep AI coding
            sessions stable, affordable, inspectable, and useful over long
            terminal runs.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-800" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-emerald-300">
              Download first, keep control local
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Put the agent in your terminal and keep credentials out of this site.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Reasonix Watch links you to GitHub, npm, DeepSeek Platform, and
              project documentation. It does not collect API keys, proxy your
              prompts, or replace the local Reasonix configuration flow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                <GitBranch className="h-4 w-4" aria-hidden="true" />
                Open GitHub Repository
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/privacy-protection"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Privacy Boundaries
              </Link>
            </div>
          </div>

          <ol className="space-y-3">
            {quickStartSteps.map((step, index) => (
              <li
                key={step}
                className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-emerald-300 text-sm font-semibold text-slate-950">
                  {index + 1}
                </span>
                <span className="text-sm leading-6 text-slate-200">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-emerald-800">
              Explore
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Source-backed Reasonix resources
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Use the homepage for download and positioning, then use the existing
            site sections for install paths, DeepSeek setup notes, and CLI
            troubleshooting.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {resourceLinks.map((item) => {
            const isExternal = item.href.startsWith("https://");
            const className =
              "rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300";

            const content = (
              <>
                <h3 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
                  {item.label}
                  {isExternal ? (
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
              </>
            );

            return isExternal ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                {content}
              </a>
            ) : (
              <Link key={item.title} href={item.href} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </section>
      </div>
    </SiteShell>
  );
}
