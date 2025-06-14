// src/app/providers.tsx
'use client';  // важная директива — этот файл загрузится только на клиенте

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/shared/lib/apolloClient';

export function Providers({ children }: { children: React.ReactNode }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
