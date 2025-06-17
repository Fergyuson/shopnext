// src/app/layout.tsx
import React from 'react';
import { Providers } from './providers';
import { Header } from '@/widgets/Header/ui/Header';  // убедитесь, что путь правильный
import '@/app/globals.css';

export const metadata = { title: 'ShopNext', description: '' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <body className="min-h-screen bg-gray-50 text-gray-800">
        <Providers>
            {/* Вот здесь показываем шапку с логотипом и кнопкой корзины */}
            <Header />
            <main className="pt-4">
                {children}
            </main>
        </Providers>
        </body>
        </html>
    );
}
