/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
// @ts-ignore 

"use client";

import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { SessionProvider } from 'next-auth/react';

const theme: MantineThemeOverride = {
    //colorScheme: "light", // "light" or "dark"
    fontFamily: "Arial, sans-serif",
    primaryColor: "violet", // Optional: Customize primary color
};

export function MantineProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                defaultColorScheme="light"
                forceColorScheme="light"
                theme={theme}>
                {children}
            </MantineProvider>
        </SessionProvider>
    );
}