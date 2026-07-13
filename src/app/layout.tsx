import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { clerkPublishableKey, isClerkConfigured } from "@/lib/auth";
import { getDefaultRouteMetadata } from "@/lib/routes";
import "./globals.css";

const defaultMetadata = getDefaultRouteMetadata("/");
const googleAnalyticsMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-TE1DZDDZYC";
const popunderScriptSrc =
  "https://pl30148888.effectivecpmnetwork.com/99/0d/1f/990d1fd0e740c456c84e0d553bab1327.js";
const htmlLanguageScript = `
  (function () {
    var path = window.location.pathname;
    var lang = "en";

    if (path === "/zh-cn" || path.indexOf("/zh-cn/") === 0) {
      lang = "zh-CN";
    } else if (path === "/zh-tw" || path.indexOf("/zh-tw/") === 0) {
      lang = "zh-TW";
    } else if (path === "/ru" || path.indexOf("/ru/") === 0) {
      lang = "ru";
    }

    document.documentElement.lang = lang;
  })();
`;

export const metadata: Metadata = {
  ...defaultMetadata,
  other: {
    ...defaultMetadata.other,
    "google-adsense-account": "ca-pub-9068083570091757",
  },
  verification: {
    ...defaultMetadata.verification,
    other: {
      ...defaultMetadata.verification?.other,
      "msvalidate.01": "C014F070EB2B9382BD86C58FD74D70E5",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const app = isClerkConfigured ? (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signInUrl="/login"
      signUpUrl="/login"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  ) : (
    children
  );

  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <Script
        id="reasonix-html-lang"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: htmlLanguageScript }}
      />
      <Script
        id="effectivecpm-popunder"
        src={popunderScriptSrc}
        strategy="beforeInteractive"
      />
      <body className="min-h-full">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
            googleAnalyticsMeasurementId,
          )}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(googleAnalyticsMeasurementId)});
          `}
        </Script>
        {app}
      </body>
    </html>
  );
}
