import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { clerkPublishableKey, isClerkConfigured } from "@/lib/auth";
import { getDefaultRouteMetadata } from "@/lib/routes";
import "./globals.css";

const defaultMetadata = getDefaultRouteMetadata("/");
const googleAnalyticsMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-TE1DZDDZYC";

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
