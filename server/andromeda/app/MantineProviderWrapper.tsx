"use client";

import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import '@mantine/core/styles.css';

const theme: MantineThemeOverride = {
    fontFamily: 'Open Sans',
};

export function MantineProviderWrapper({ children }: {
    children: React.ReactNode
}) {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
            {children}
        </MantineProvider>
    );
}