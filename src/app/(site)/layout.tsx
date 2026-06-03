import { SiteShell } from "@/components/SiteShell";

export default function SiteGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteShell>{children}</SiteShell>;
}
