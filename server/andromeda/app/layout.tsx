import { ColorSchemeScript, mantineHtmlProps, MantineThemeOverride } from "@mantine/core";
import '@mantine/core/styles.css';
import type { Metadata } from "next";
import "./globals.css";
import { MantineProviderWrapper } from "./MantineProviderWrapper";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Aboreto&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Aboreto&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProviderWrapper>
          {children}
        </MantineProviderWrapper>
        {/* <MantineProvider theme={theme}>{children}</MantineProvider> */}
      </body>
    </html>
  );
}
