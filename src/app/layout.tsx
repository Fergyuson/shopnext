// src/app/layout.tsx
import React from 'react';
import { Providers } from './providers';     // <-- импортируем client component
import '@/app/globals.css';

export const metadata = {
    title: 'ShopNext',
    description: 'Ваш магазин на Next.js + Apollo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <body className="min-h-screen bg-gray-50 text-gray-800">
        {/* Providers — это client component, внутри него уже будет ApolloProvider */}
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
