import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const domainRedirects = [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.deepseekreasonix.com" }],
        destination: "https://deepseekreasonix.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "reasonix.click" }],
        destination: "https://deepseekreasonix.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.reasonix.click" }],
        destination: "https://deepseekreasonix.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "reasonix(?:-[a-z0-9-]+)?\\.vercel\\.app",
          },
        ],
        destination: "https://deepseekreasonix.com/:path*",
        permanent: true,
      },
    ];

    const clerkRedirects = [
      {
        source: "/__clerk/:path*",
        destination: "https://clerk.deepseekreasonix.com/:path*",
        permanent: false,
      },
    ];

    const indexRedirects = [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.htm",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:locale(zh-cn|zh-tw|ru)/index.html",
        destination: "/:locale",
        permanent: true,
      },
      {
        source: "/:locale(zh-cn|zh-tw|ru)/index.htm",
        destination: "/:locale",
        permanent: true,
      },
    ];

    const articleRedirects = [
      [
        "reasonix-claude-codex-opencode-comparison",
        "reasonix-vs-coding-agent-types",
      ],
      [
        "claude-code-vs-codex-vs-opencode",
        "reasonix-local-agent-vs-generic-ai-cli",
      ],
      [
        "reasonix-alongside-claude-codex-opencode",
        "reasonix-deepseek-native-advantages",
      ],
      [
        "codex-vs-claude-code-for-engineering-teams",
        "reasonix-team-workflow-comparison",
      ],
      [
        "opencode-open-source-agent-vs-closed-agents",
        "reasonix-open-source-agent-comparison",
      ],
    ];

    return [
      ...clerkRedirects,
      ...domainRedirects,
      ...indexRedirects,
      ...articleRedirects.flatMap(([from, to]) => [
        {
          source: `/articles/${from}`,
          destination: `/articles/${to}`,
          permanent: true,
        },
        {
          source: `/:locale(zh-cn|zh-tw|ru)/articles/${from}`,
          destination: `/:locale/articles/${to}`,
          permanent: true,
        },
      ]),
    ];
  },
};

export default nextConfig;
