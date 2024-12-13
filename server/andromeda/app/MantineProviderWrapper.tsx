"use client";

import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import '@mantine/core/styles.css';
import { SessionProvider } from 'next-auth/react';

const theme: MantineThemeOverride = {
    //colorScheme: "light", // "light" or "dark"
    fontFamily: "Arial, sans-serif",
    primaryColor: "violet", // Optional: Customize primary color
};

export function MantineProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
                {children}
            </MantineProvider>
        </SessionProvider>
    );
}