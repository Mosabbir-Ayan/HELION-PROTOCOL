import type { Metadata, Viewport } from "next";
import "./globals.css";

const APP_NAME = "HELION PROTOCOL";

export const metadata: Metadata = {
  title: APP_NAME,
  description:
    "A NASA-aligned solar system recovery mission. Crash on Mars, survey eight planets, craft from real materials.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090b0e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Condensed:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
        />
      </head>
      <body className="bg-bg text-fg">{children}</body>
    </html>
  );
}
