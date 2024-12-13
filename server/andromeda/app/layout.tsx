import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { theme } from '../theme';
import "./globals.css";

export const metadata: Metadata = {
  title: "Andromeda ✨",
  description: "🌀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
