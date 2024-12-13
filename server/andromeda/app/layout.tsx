import { ColorSchemeScript, mantineHtmlProps, MantineProvider, MantineThemeOverride } from "@mantine/core";
import '@mantine/core/styles.css';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andromeda ✨",
  description: "🌀",
};

const theme: MantineThemeOverride = {
  //colorScheme: "light", // "light" or "dark"
  fontFamily: "Arial, sans-serif",
  primaryColor: "violet", // Optional: Customize primary color
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
